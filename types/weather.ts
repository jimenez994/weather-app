export type WeatherCondition =
  | "clear"
  | "partly-cloudy"
  | "cloudy"
  | "overcast"
  | "rain"
  | "drizzle"
  | "thunderstorm"
  | "snow"
  | "sleet"
  | "fog"
  | "unknown";

export interface City {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface CurrentWeather {
  /**
   * RAW API VALUES ONLY
   * NEVER convert in UI
   */

  // 🌡 Temperature in Celsius (Open-Meteo default)
  temperature: number;
  feelsLike: number;

  // 💧 Relative humidity (%)
  humidity: number;

  /**
   * 🌬 Wind speed in METERS PER SECOND (m/s)
   * API explicitly requests m/s via wind_speed_unit=ms
   */
  windSpeed: number;
  windDirection: number;
  windGust: number;

  // 🌤 Weather metadata
  weatherCode: number;
  isDay: boolean;
  uvIndex: number;

  /**
   * 👁 Visibility in METERS ONLY
   */
  visibility: number;

  /**
   * 🌧 Precipitation in MILLIMETERS ONLY
   */
  precipitation: number;

  /**
   * ⏱ Pressure in hPa (hectopascals)
   */
  pressure: number;
}

/**
 * HOURLY DATA (RAW ONLY)
 */
export interface HourlyForecast {
  time: string[];
  temperature2m: number[];
  weatherCode: number[];
  precipitationProbability: number[];
  windSpeed10m: number[]; // m/s
}

/**
 * DAILY DATA (RAW ONLY)
 */
export interface DailyForecast {
  time: string[];
  weatherCode: number[];
  temperature2mMax: number[];
  temperature2mMin: number[];
  precipitationProbabilityMax: number[];
  precipitationSum: number[];
  windSpeed10mMax: number[]; // m/s
  uvIndexMax: number[];
  sunrise: string[];
  sunset: string[];
}

/**
 * AIR QUALITY (RAW API VALUES)
 */
export interface AirQuality {
  time: string[];
  pm25: number[];
  pm10: number[];
  usAqi: number[];
}

/**
 * WEATHER ALERTS (UI LEVEL ONLY)
 */
export type WeatherSeverity = "minor" | "moderate" | "severe";

export interface WeatherAlert {
  id: string;
  severity: WeatherSeverity;
  headline: string;
  description: string;
  start: string;
  end: string;
}

/**
 * FINAL WEATHER OBJECT
 */
export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyForecast;
  daily: DailyForecast;
  airQuality?: AirQuality;
  alerts: WeatherAlert[];
}