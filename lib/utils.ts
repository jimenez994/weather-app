import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudSnow,
  CloudLightning,
  CloudFog,
} from "lucide-react";
import { WEATHER_CONDITIONS } from "./constants";

const iconComponentMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sun, CloudSun, Cloud, CloudRain, CloudDrizzle, CloudSnow, CloudLightning, CloudFog,
};

export function getWeatherIconComponent(code: number): React.ComponentType<{ className?: string }> {
  const iconName = WEATHER_CONDITIONS[code]?.icon ?? "Cloud";
  return iconComponentMap[iconName] ?? Cloud;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}


export function getWeatherLabel(code: number): string {
  return WEATHER_CONDITIONS[code]?.label ?? "Unknown";
}

export function getWeatherIcon(code: number): string {
  return WEATHER_CONDITIONS[code]?.icon ?? "Cloud";
}

export function getWeatherCondition(code: number): string {
  return WEATHER_CONDITIONS[code]?.condition ?? "unknown";
}

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function msToMph(ms: number): number {
  return ms * 2.23694;
}

export function hPaToInHg(hPa: number): number {
  return hPa * 0.02953;
}

export function metersToMiles(meters: number): number {
  return meters / 1609.344;
}

export function mmToInches(mm: number): number {
  return mm * 0.0393701;
}

export function formatTemperature(tempC: number): string {
  return `${Math.round(celsiusToFahrenheit(tempC))}°F`;
}

export function getWindDirection(degrees: number): string {
  const directions = [
    "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

export function getWindArrowRotation(degrees: number): number {
  return degrees + 180;
}

export function getUvLevel(index: number): { level: string; color: string } {
  if (index <= 2) return { level: "Low", color: "#4ade80" };
  if (index <= 5) return { level: "Moderate", color: "#facc15" };
  if (index <= 7) return { level: "High", color: "#fb923c" };
  if (index <= 10) return { level: "Very High", color: "#ef4444" };
  return { level: "Extreme", color: "#a855f7" };
}

export function getAirQualityLabel(aqi: number): { level: string; color: string; label: string } {
  if (aqi <= 50) return { level: "Good", color: "#4ade80", label: "Good" };
  if (aqi <= 100) return { level: "Moderate", color: "#facc15", label: "Moderate" };
  if (aqi <= 150) return { level: "Unhealthy (Sensitive)", color: "#fb923c", label: "Unhealthy (Sensitive)" };
  if (aqi <= 200) return { level: "Unhealthy", color: "#ef4444", label: "Unhealthy" };
  if (aqi <= 300) return { level: "Very Unhealthy", color: "#a855f7", label: "Very Unhealthy" };
  return { level: "Hazardous", color: "#dc2626", label: "Hazardous" };
}

export function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDay(isoString: string): string {
  const date = new Date(isoString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export function formatHour(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
}

export function isNightTime(sunrise: string, sunset: string): boolean {
  const now = new Date();
  const sunriseDate = new Date(sunrise);
  const sunsetDate = new Date(sunset);
  return now < sunriseDate || now > sunsetDate;
}

export function getTimeOfDay(): "morning" | "afternoon" | "evening" | "night" {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

