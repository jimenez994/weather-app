import { create } from "zustand";
import type { City } from "@/types/weather";
import { DEFAULT_CITY } from "@/lib/constants";

const CACHE_KEY = "weather_last_location";

function readCachedLocation(): City | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed.name === "string" &&
      typeof parsed.latitude === "number" &&
      typeof parsed.longitude === "number" &&
      typeof parsed.country === "string"
    ) {
      return parsed as City;
    }
    return null;
  } catch {
    return null;
  }
}

function writeCachedLocation(city: City): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(city));
  } catch {
    // quota exceeded or localStorage unavailable — silently ignore
  }
}

interface WeatherState {
  selectedCity: City;
  setSelectedCity: (city: City) => void;
  hydrated: boolean;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  selectedCity: DEFAULT_CITY,
  hydrated: false,

  setSelectedCity: (city) => {
    writeCachedLocation(city);
    set({ selectedCity: city });
  },
}));

// Hydrate from cache once on module init (client-side only)
if (typeof window !== "undefined") {
  const cached = readCachedLocation();
  if (cached) {
    useWeatherStore.setState({ selectedCity: cached, hydrated: true });
  } else {
    useWeatherStore.setState({ hydrated: true });
  }
}
