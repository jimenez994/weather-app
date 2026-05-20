import type { WeatherData } from "@/types/weather";

const CACHE_KEY = "weather-cache-v1";

export function saveWeatherCache(data: WeatherData) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        data,
      })
    );
  } catch {}
}

export function getWeatherCache(): WeatherData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    // 30 min max age
    const isStale = Date.now() - parsed.timestamp > 30 * 60 * 1000;

    return isStale ? null : parsed.data;
  } catch {
    return null;
  }
}