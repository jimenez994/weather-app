import type { WeatherData, WeatherAlert } from "@/types/weather";
import { retryWithBackoff } from "@/lib/retry";
import { celsiusToFahrenheit } from "@/lib/utils";

const BASE_URL = "https://api.open-meteo.com/v1";
const AIR_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";
const TIMEOUT_MS = 8000;

// ------------------------------------
// SAFE FETCH WRAPPER
// ------------------------------------
async function safeFetch(url: string, timeout = TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { signal: controller.signal });
    return res;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function clampVisibility(value?: number): number {
  if (typeof value !== "number" || isNaN(value) || value <= 0) {
    return 16000;
  }
  return Math.min(value, 80000);
}

// ------------------------------------
// MAIN WEATHER FUNCTION
// ------------------------------------
export async function fetchWeatherData(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),

    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "weather_code",
      "pressure_msl",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
      "uv_index",
      "visibility",
      "precipitation",
    ].join(","),

    hourly: [
      "temperature_2m",
      "weather_code",
      "precipitation_probability",
      "wind_speed_10m",
    ].join(","),

    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max",
      "precipitation_sum",
      "wind_speed_10m_max",
      "uv_index_max",
      "sunrise",
      "sunset",
    ].join(","),

    wind_speed_unit: "ms",
    timezone: "auto",
    forecast_days: "7",
  });

  const fallback: WeatherData = {
    current: {
      temperature: 22,
      feelsLike: 22,
      humidity: 45,
      pressure: 1013,
      windSpeed: 4,
      windDirection: 180,
      windGust: 0,
      weatherCode: 0,
      isDay: true,
      uvIndex: 3,
      visibility: 16000,
      precipitation: 0,
    },
    hourly: {
      time: [],
      temperature2m: [],
      weatherCode: [],
      precipitationProbability: [],
      windSpeed10m: [],
    },
    daily: {
      time: [],
      weatherCode: [],
      temperature2mMax: [],
      temperature2mMin: [],
      precipitationProbabilityMax: [],
      precipitationSum: [],
      windSpeed10mMax: [],
      uvIndexMax: [],
      sunrise: [],
      sunset: [],
    },
    airQuality: undefined,
    alerts: [],
  };

  try {
    const [weatherRes, airRes] = await retryWithBackoff(() =>
      Promise.all([
        safeFetch(`${BASE_URL}/forecast?${params}`),
        safeFetch(
          `${AIR_URL}?latitude=${latitude}&longitude=${longitude}&hourly=pm2_5,pm10,us_aqi&timezone=auto`
        ),
      ])
    );

    if (!weatherRes?.ok) return fallback;

    const weather = await weatherRes.json();
    const air = airRes?.ok ? await airRes.json().catch(() => null) : null;

    const current = weather.current ?? {};
    const hourly = weather.hourly ?? {};
    const daily = weather.daily ?? {};
    // ------------------------------------
// DEBUG WIND DATA
// ------------------------------------

    const maxTempToday =
      Array.isArray(daily.temperature_2m_max)
        ? Math.max(
            ...daily.temperature_2m_max.filter((v: any) => typeof v === "number")
          )
        : 22;

    // ------------------------------------
    // RAW VISIBILITY (METERS → SAFE)
    // ------------------------------------
    const rawVisibilityMeters = clampVisibility(current.visibility);

    return {
      current: {
        temperature: current.temperature_2m ?? 22,
        feelsLike: current.apparent_temperature ?? 22,
        humidity: current.relative_humidity_2m ?? 45,
        pressure: current.pressure_msl ?? 1013,
        windSpeed: current.wind_speed_10m ?? 4,
        windDirection: current.wind_direction_10m ?? 0,
        windGust: current.wind_gusts_10m ?? 0,
        weatherCode: current.weather_code ?? 0,
        isDay: current.is_day === 1,
        uvIndex: current.uv_index ?? 0,

        // 🔥 SINGLE SOURCE OF TRUTH (METERS ONLY)
        visibility: rawVisibilityMeters,

        precipitation: current.precipitation ?? 0,
      },

      hourly: {
        time: (hourly.time ?? []).slice(0, 48),
        temperature2m: (hourly.temperature_2m ?? []).slice(0, 48),
        weatherCode: (hourly.weather_code ?? []).slice(0, 48),
        precipitationProbability: (hourly.precipitation_probability ?? []).slice(0, 48),
        windSpeed10m: (hourly.wind_speed_10m ?? []).slice(0, 48),
      },

      daily: {
        time: daily.time ?? [],
        weatherCode: daily.weather_code ?? [],
        temperature2mMax: daily.temperature_2m_max ?? [],
        temperature2mMin: daily.temperature_2m_min ?? [],
        precipitationProbabilityMax: daily.precipitation_probability_max ?? [],
        precipitationSum: daily.precipitation_sum ?? [],
        windSpeed10mMax: daily.wind_speed_10m_max ?? [],
        uvIndexMax: daily.uv_index_max ?? [],
        sunrise: daily.sunrise ?? [],
        sunset: daily.sunset ?? [],
      },

      airQuality: air
        ? {
            time: air.hourly?.time ?? [],
            pm25: air.hourly?.pm2_5 ?? [],
            pm10: air.hourly?.pm10 ?? [],
            usAqi: air.hourly?.us_aqi ?? [],
          }
        : undefined,

      alerts: generateMockAlerts(
        current.weather_code ?? 0,
        maxTempToday
      ),
    };
  } catch (err) {
    console.error("Weather fetch failed:", err);
    return fallback;
  }
}

// ------------------------------------
// ALERT SYSTEM (CLEAN + SAFE)
// ------------------------------------
function generateMockAlerts(
  weatherCode: number,
  maxTemp: number
): WeatherAlert[] {
  const alerts: WeatherAlert[] = [];

  const safeTempC =
    typeof maxTemp === "number" && !isNaN(maxTemp)
      ? maxTemp
      : 22;

  const safeTempF = celsiusToFahrenheit(safeTempC);

  if (weatherCode >= 95) {
    alerts.push({
      id: "storm-1",
      severity: "severe",
      headline: "Thunderstorm Warning",
      description:
        "Thunderstorms expected in your area. Stay indoors.",
      start: new Date().toISOString(),
      end: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    });
  }

  if (safeTempF >= 95) {
    alerts.push({
      id: "heat-1",
      severity: "moderate",
      headline: "Heat Advisory",
      description:
        "High temperatures expected. Stay hydrated.",
      start: new Date().toISOString(),
      end: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  if (safeTempF <= 32) {
    alerts.push({
      id: "cold-1",
      severity: "moderate",
      headline: "Freeze Warning",
      description:
        "Below-freezing temperatures expected. Protect pipes and plants.",
      start: new Date().toISOString(),
      end: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  return alerts;
}