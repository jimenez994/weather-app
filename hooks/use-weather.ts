"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "@/lib/api";
import { useWeatherStore } from "@/store/weather";

export function useWeather() {
  const { selectedCity } = useWeatherStore();

  return useQuery({
    queryKey: ["weather", selectedCity.latitude, selectedCity.longitude],

    queryFn: () =>
      fetchWeatherData(selectedCity.latitude, selectedCity.longitude),

    // -----------------------------
    // ⚡ FAST UX (no loading flicker)
    // -----------------------------
    staleTime: 5 * 60 * 1000, // 5 min fresh data window

    // -----------------------------
    // 🔄 BACKGROUND REFRESH (THE MAGIC)
    // -----------------------------
    refetchInterval: 10 * 60 * 1000, // every 10 min
    refetchIntervalInBackground: true, // even if tab is not focused

    // -----------------------------
    // 🧠 SMART BEHAVIOR
    // -----------------------------
    refetchOnWindowFocus: true, // refresh when user returns
    refetchOnReconnect: true, // refresh when internet returns

    notifyOnChangeProps: ["data", "error"],

    // -----------------------------
    // 🛡️ SAFETY
    // -----------------------------
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
  });
}