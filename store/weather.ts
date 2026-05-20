import { create } from "zustand";
import type { City } from "@/types/weather";
import { DEFAULT_CITY } from "@/lib/constants";

interface WeatherState {
  selectedCity: City;
  setSelectedCity: (city: City) => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  selectedCity: DEFAULT_CITY,
  setSelectedCity: (city) => set({ selectedCity: city }),
}));
