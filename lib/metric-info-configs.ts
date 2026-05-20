import type { MetricInfoConfig } from "@/lib/types/metrics";
import {
  celsiusToFahrenheit,
  msToMph,
  hPaToInHg,
  metersToMiles,
  mmToInches,
} from "@/lib/utils";

/* -----------------------------------
   FEELS LIKE (°C → °F)
----------------------------------- */
export function feelsLikeConfig(
  actualC: number,
  feelsLikeC: number
): MetricInfoConfig {
  const actualF = Math.round(celsiusToFahrenheit(actualC));
  const feelsLikeF = Math.round(celsiusToFahrenheit(feelsLikeC));

  const diff = feelsLikeF - actualF;
  const absDiff = Math.abs(diff);

  return {
    title: "Feels Like",
    description: "Feels like temperature accounts for wind and humidity effects.",
    currentValue: feelsLikeF,
    unit: "°F",
    ranges: [
      { label: "Cold", color: "#3b82f6", min: 0, max: 50 },
      { label: "Mild", color: "#4ade80", min: 51, max: 70 },
      { label: "Warm", color: "#facc15", min: 71, max: 85 },
      { label: "Hot", color: "#ef4444", min: 86, max: 120 },
    ],
    idealLabel:
      diff === 0
        ? "Feels exactly like actual temperature."
        : diff > 0
        ? `Feels ${absDiff}°F warmer than actual.`
        : `Feels ${absDiff}°F colder than actual.`,
  };
}

/* -----------------------------------
   UV INDEX
----------------------------------- */
export function uvIndexConfig(uvIndex: number): MetricInfoConfig {
  const value = Math.round(uvIndex);

  return {
    title: "UV Index",
    description:
      "The UV Index measures the strength of ultraviolet radiation from the sun.",
    currentValue: value,
    unit: "UVI",
    ranges: [
      { label: "Low", color: "#4ade80", min: 0, max: 2 },
      { label: "Moderate", color: "#facc15", min: 3, max: 5 },
      { label: "High", color: "#fb923c", min: 6, max: 7 },
      { label: "Very High", color: "#ef4444", min: 8, max: 10 },
      { label: "Extreme", color: "#a855f7", min: 11, max: 14 },
    ],
    idealLabel: "Wear sunscreen when UV index is 3+.",
  };
}

/* -----------------------------------
   WIND SPEED (m/s → mph) FIXED
----------------------------------- */
export function windConfig(windSpeedMs: number): MetricInfoConfig {
  const mphRaw = msToMph(windSpeedMs);

  // IMPORTANT: single conversion + stable rounding
  const mph = Math.round(mphRaw * 10) / 10;

  return {
    title: "Wind Speed",
    description:
      "Wind speed affects how cold it feels and outdoor comfort.",
    currentValue: mph,
    unit: "mph",

    ranges: [
      { label: "Calm", color: "#4ade80", min: 0, max: 5 },
      { label: "Light", color: "#a3e635", min: 5, max: 10 },
      { label: "Breezy", color: "#facc15", min: 10, max: 15 },
      { label: "Windy", color: "#fb923c", min: 15, max: 25 },
      { label: "Strong", color: "#ef4444", min: 25, max: 40 },
      { label: "Severe", color: "#a855f7", min: 40, max: 75 },
    ],

    idealLabel: "Comfortable range: 0–12 mph.",
  };
}

/* -----------------------------------
   HUMIDITY
----------------------------------- */
export function humidityConfig(humidity: number): MetricInfoConfig {
  return {
    title: "Humidity",
    description: "Relative humidity measures moisture in the air.",
    currentValue: humidity,
    unit: "%",
    ranges: [
      { label: "Dry", color: "#fb923c", min: 0, max: 25 },
      { label: "Comfortable", color: "#4ade80", min: 26, max: 60 },
      { label: "Humid", color: "#facc15", min: 61, max: 80 },
      { label: "Very Humid", color: "#ef4444", min: 81, max: 100 },
    ],
    idealLabel: "Ideal indoor range: 30–50%.",
  };
}

/* -----------------------------------
   PRESSURE (hPa → inHg)
----------------------------------- */
export function pressureConfig(pressureHPa: number): MetricInfoConfig {
  const inHg = Math.round(hPaToInHg(pressureHPa) * 100) / 100;

  return {
    title: "Atmospheric Pressure",
    description: "Barometric pressure indicates weather changes.",
    currentValue: inHg,
    unit: "inHg",
    ranges: [
      { label: "Low", color: "#fb923c", min: 28.9, max: 29.7 },
      { label: "Normal", color: "#4ade80", min: 29.7, max: 30.1 },
      { label: "High", color: "#facc15", min: 30.1, max: 30.7 },
    ],
    idealLabel: "Standard: 29.92 inHg.",
  };
}

/* -----------------------------------
   VISIBILITY (meters → miles)
----------------------------------- */
export function visibilityConfig(visibilityMeters: number): MetricInfoConfig {
  const miles = Math.min(metersToMiles(visibilityMeters), 25);
  const rounded = Math.round(miles * 10) / 10;

  return {
    title: "Visibility",
    description: "How far you can see clearly.",
    currentValue: rounded,
    unit: "mi",
    ranges: [
      { label: "Poor", color: "#ef4444", min: 0, max: 2 },
      { label: "Fair", color: "#fb923c", min: 2, max: 5 },
      { label: "Good", color: "#facc15", min: 5, max: 10 },
      { label: "Excellent", color: "#4ade80", min: 10, max: 25 },
    ],
    idealLabel: "Excellent visibility: 10+ miles.",
  };
}

/* -----------------------------------
   SUN HOURS
----------------------------------- */
export function sunriseSunsetConfig(
  sunrise: string,
  sunset: string
): MetricInfoConfig {
  const hours =
    (new Date(sunset).getTime() - new Date(sunrise).getTime()) / 3600000;

  return {
    title: "Sunrise & Sunset",
    description: "Day length varies by season.",
    currentValue: Math.round(hours * 10) / 10,
    unit: "hours",
    ranges: [
      { label: "Short", color: "#3b82f6", min: 6, max: 9 },
      { label: "Moderate", color: "#facc15", min: 9, max: 12 },
      { label: "Long", color: "#fb923c", min: 12, max: 15 },
      { label: "Very Long", color: "#ef4444", min: 15, max: 20 },
    ],
    idealLabel: "Average day length: 12 hours.",
  };
}

/* -----------------------------------
   PRECIPITATION (mm → inches)
----------------------------------- */
export function precipitationConfig(precipMm: number): MetricInfoConfig {
  const inches = Math.round(mmToInches(precipMm) * 100) / 100;

  return {
    title: "Precipitation",
    description: "Expected rainfall amount.",
    currentValue: inches,
    unit: "in",
    ranges: [
      { label: "None", color: "#4ade80", min: 0, max: 0.02 },
      { label: "Light", color: "#facc15", min: 0.02, max: 0.1 },
      { label: "Moderate", color: "#fb923c", min: 0.1, max: 0.4 },
      { label: "Heavy", color: "#ef4444", min: 0.4, max: 2 },
    ],
  };
}

/* -----------------------------------
   AIR QUALITY (US EPA AQI scale)
----------------------------------- */
export function airQualityConfig(aqi: number): MetricInfoConfig {
  return {
    title: "Air Quality Index",
    description: "US EPA Air Quality Index. Ranges: 0-500.",
    currentValue: aqi,
    unit: "AQI",
    ranges: [
      { label: "Good", color: "#4ade80", min: 0, max: 50 },
      { label: "Moderate", color: "#facc15", min: 51, max: 100 },
      { label: "Unhealthy (Sensitive)", color: "#fb923c", min: 101, max: 150 },
      { label: "Unhealthy", color: "#ef4444", min: 151, max: 200 },
      { label: "Very Unhealthy", color: "#a855f7", min: 201, max: 300 },
      { label: "Hazardous", color: "#dc2626", min: 301, max: 500 },
    ],
  };
}