"use client";

import { useState, useCallback } from "react";
import { reverseGeocode } from "@/lib/geocoding";
import { useWeatherStore } from "@/store/weather";
import { DEFAULT_CITY } from "@/lib/constants";

export function useGeolocation() {
  const { setSelectedCity } = useWeatherStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = useCallback(async () => {
    setError(null);

    if (!navigator.geolocation) {
      setSelectedCity(DEFAULT_CITY);
      setError("Geolocation not supported by your browser.");
      return;
    }

    setLoading(true);

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 8000,
            maximumAge: 30 * 60 * 1000,
            enableHighAccuracy: false,
          });
        }
      );

      const city = await Promise.race([
        reverseGeocode(position.coords.latitude, position.coords.longitude),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("reverse timeout")), 5000)
        ),
      ]);

      if (city) {
        setSelectedCity(city);
      } else {
        setSelectedCity(DEFAULT_CITY);
      }
    } catch (err: any) {
      if (err?.code === 1) {
        setError("Location permission denied. Enable it in your browser settings.");
      } else {
        setError("Could not determine your location.");
      }
      setSelectedCity(DEFAULT_CITY);
    } finally {
      setLoading(false);
    }
  }, [setSelectedCity]);

  return { getLocation, loading, error };
}
