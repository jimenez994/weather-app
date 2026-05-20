import type { WeatherCondition } from "@/types/weather";

export const WEATHER_CONDITIONS: Record<number, { condition: WeatherCondition; label: string; icon: string }> = {
  0: { condition: "clear", label: "Clear sky", icon: "Sun" },
  1: { condition: "partly-cloudy", label: "Mainly clear", icon: "Sun" },
  2: { condition: "partly-cloudy", label: "Partly cloudy", icon: "CloudSun" },
  3: { condition: "overcast", label: "Overcast", icon: "Cloud" },
  45: { condition: "fog", label: "Fog", icon: "CloudFog" },
  48: { condition: "fog", label: "Depositing rime fog", icon: "CloudFog" },
  51: { condition: "drizzle", label: "Light drizzle", icon: "CloudDrizzle" },
  53: { condition: "drizzle", label: "Moderate drizzle", icon: "CloudDrizzle" },
  55: { condition: "drizzle", label: "Dense drizzle", icon: "CloudDrizzle" },
  56: { condition: "sleet", label: "Light freezing drizzle", icon: "CloudDrizzle" },
  57: { condition: "sleet", label: "Dense freezing drizzle", icon: "CloudDrizzle" },
  61: { condition: "rain", label: "Slight rain", icon: "CloudRain" },
  63: { condition: "rain", label: "Moderate rain", icon: "CloudRain" },
  65: { condition: "rain", label: "Heavy rain", icon: "CloudRain" },
  66: { condition: "sleet", label: "Light freezing rain", icon: "CloudRain" },
  67: { condition: "sleet", label: "Heavy freezing rain", icon: "CloudRain" },
  71: { condition: "snow", label: "Slight snowfall", icon: "CloudSnow" },
  73: { condition: "snow", label: "Moderate snowfall", icon: "CloudSnow" },
  75: { condition: "snow", label: "Heavy snowfall", icon: "CloudSnow" },
  77: { condition: "snow", label: "Snow grains", icon: "CloudSnow" },
  80: { condition: "rain", label: "Slight rain showers", icon: "CloudRain" },
  81: { condition: "rain", label: "Moderate rain showers", icon: "CloudRain" },
  82: { condition: "rain", label: "Violent rain showers", icon: "CloudRain" },
  85: { condition: "snow", label: "Slight snow showers", icon: "CloudSnow" },
  86: { condition: "snow", label: "Heavy snow showers", icon: "CloudSnow" },
  95: { condition: "thunderstorm", label: "Thunderstorm", icon: "CloudLightning" },
  96: { condition: "thunderstorm", label: "Thunderstorm with slight hail", icon: "CloudLightning" },
  99: { condition: "thunderstorm", label: "Thunderstorm with heavy hail", icon: "CloudLightning" },
};

export const BACKGROUND_GRADIENTS: Record<WeatherCondition, string> = {
  clear: "from-sky-900 via-blue-900 to-indigo-950",
  "partly-cloudy": "from-sky-900 via-blue-900 to-slate-900",
  cloudy: "from-slate-800 via-gray-800 to-slate-900",
  overcast: "from-slate-800 via-slate-900 to-gray-900",
  rain: "from-slate-900 via-blue-950 to-slate-900",
  drizzle: "from-slate-800 via-blue-900 to-slate-900",
  thunderstorm: "from-slate-950 via-purple-950 to-slate-950",
  snow: "from-slate-800 via-blue-900 to-slate-900",
  sleet: "from-slate-800 via-blue-900 to-slate-900",
  fog: "from-slate-800 via-gray-800 to-slate-800",
  unknown: "from-sky-900 via-blue-900 to-indigo-950",
};

export const DEFAULT_CITY = {
  name: "New York",
  latitude: 40.7128,
  longitude: -74.006,
  country: "US",
};
