"use client";

import { useEffect, useState } from "react";
import { reverseGeocode } from "@/lib/geocoding";
import { useWeatherStore } from "@/store/weather";
import { DEFAULT_CITY } from "@/lib/constants";

export function useGeolocation() {
  const { setSelectedCity } = useWeatherStore();
  const [locationReady, setLocationReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const safeSetCity = (city: any) => {
      if (isMounted) setSelectedCity(city);
    };

    const finalize = () => {
      if (isMounted) setLocationReady(true);
    };

    // -----------------------------
    // 1. NO GEOLOCATION SUPPORT
    // -----------------------------
    if (!navigator.geolocation) {
      safeSetCity(DEFAULT_CITY);
      finalize();
      return () => {
        isMounted = false;
      };
    }

    // -----------------------------
    // 2. GEOLOCATION REQUEST
    // -----------------------------
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const city = await Promise.race([
            reverseGeocode(
              pos.coords.latitude,
              pos.coords.longitude
            ),
            new Promise((_, reject) =>
              setTimeout(() => reject("reverse timeout"), 5000)
            ),
          ]);

          safeSetCity(city || DEFAULT_CITY);
        } catch (error) {
          console.error("Reverse geocoding failed:", error);
          safeSetCity(DEFAULT_CITY);
        } finally {
          finalize();
        }
      },

      // -----------------------------
      // 3. GEOLOCATION ERROR
      // -----------------------------
      () => {
        safeSetCity(DEFAULT_CITY);
        finalize();
      },

      // -----------------------------
      // 4. GEOLOCATION OPTIONS
      // -----------------------------
      {
        timeout: 8000,
        maximumAge: 30 * 60 * 1000,
        enableHighAccuracy: false,
      }
    );

    return () => {
      isMounted = false;
    };
  }, [setSelectedCity]);

  return locationReady;
}