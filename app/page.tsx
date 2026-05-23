"use client";

import { useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin, Loader2 } from "lucide-react";
import { useWeather } from "@/hooks/use-weather";
import { useGeolocation } from "@/hooks/use-geolocation";
import { useWeatherStore } from "@/store/weather";
import { useFavoritesStore } from "@/store/favorites";

import WeatherBackground from "@/components/weather/weather-background";
import CurrentWeather from "@/components/weather/current-weather";
import HourlyForecast from "@/components/weather/hourly-forecast";
import DailyForecast from "@/components/weather/daily-forecast";
import WeatherDetails from "@/components/weather/weather-details";
import CitySearch from "@/components/weather/city-search";
import FavoritesList from "@/components/weather/favorites-list";
import ForecastChart from "@/components/weather/forecast-chart";
import AirQuality from "@/components/weather/air-quality";
import SunriseSunset from "@/components/weather/sunrise-sunset";
import WeatherAlerts from "@/components/weather/weather-alerts";
import { WeatherSkeleton } from "@/components/ui/skeleton";
import AnimatedContainer from "@/components/ui/animated-container";

export default function HomePage() {
  const { getLocation, loading: geoLoading, error: geoError } = useGeolocation();
  const { data, isLoading, error } = useWeather();
  const { selectedCity } = useWeatherStore();
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  // -----------------------------
  // MEMOIZED SAFE CITY
  // -----------------------------
  const safeCity = useMemo(
    () =>
      selectedCity ?? {
        name: "Loading...",
        country: "US",
        latitude: 0,
        longitude: 0,
      },
    [selectedCity]
  );

  // -----------------------------
  // MEMOIZED FAVORITE STATE
  // -----------------------------
  const isFav = useMemo(() => {
    return isFavorite?.(selectedCity ?? safeCity) ?? false;
  }, [isFavorite, selectedCity, safeCity]);

  // -----------------------------
  // STABLE FAVORITE HANDLER
  // -----------------------------
  const handleFavoriteToggle = useCallback(() => {
    if (!selectedCity) return;

    if (isFav) {
      removeFavorite(selectedCity);
    } else {
      addFavorite(selectedCity);
    }
  }, [selectedCity, isFav, addFavorite, removeFavorite]);

  // -----------------------------
  // LOADING STATE
  // -----------------------------
  const isFirstLoad = !data && isLoading;

  if (isFirstLoad) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-900 via-blue-900 to-indigo-950">
        <WeatherSkeleton />
      </div>
    );
  }

  // -----------------------------
  // ERROR STATE
  // -----------------------------
  if (error && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-900 via-blue-900 to-indigo-950 flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-2xl font-light text-white/80 mb-2">
            Unable to load weather
          </p>

          <p className="text-sm text-white/40 mb-4">
            Check your connection and try again
          </p>

          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm hover:bg-white/20 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // -----------------------------
  // SAFETY GUARD
  // -----------------------------
  if (!data?.current || !data?.hourly || !data?.daily) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/60">
        Loading weather data...
      </div>
    );
  }

  return (
    <WeatherBackground
      weatherCode={data.current.weatherCode ?? 0}
      temperature={data.current.temperature}
      isDay={data.current.isDay}
    >
      <div className="min-h-screen">
        {/* HEADER */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/5">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
            <CitySearch />

            <div className="flex items-center gap-2 shrink-0">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.15 }}
                onClick={getLocation}
                disabled={geoLoading}
                className="p-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md transition-colors hover:bg-white/20 disabled:opacity-50"
                title={geoError ?? "Use my location"}
              >
                {geoLoading ? (
                  <Loader2 className="w-4 h-4 text-white/60 animate-spin" />
                ) : (
                  <MapPin className="w-4 h-4 text-white/60" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.15 }}
                onClick={handleFavoriteToggle}
                className="p-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md transition-colors hover:bg-white/20"
                style={{
                  willChange: "transform",
                }}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFav
                      ? "fill-red-400 text-red-400"
                      : "text-white/50"
                  }`}
                />
              </motion.button>
            </div>
          </div>
        </header>

        {/* MAIN */}
        <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${safeCity.latitude}-${safeCity.longitude}-${data.current.weatherCode}`}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -6,
              }}
              transition={{
                duration: 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="space-y-6"
              style={{
                willChange: "transform, opacity",
              }}
            >
              <FavoritesList />

              {(data?.alerts?.length ?? 0) > 0 && (
                <WeatherAlerts alerts={data.alerts} />
              )}

              {/* GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                  <CurrentWeather
                    data={data.current}
                    cityName={`${safeCity.name}, ${safeCity.country}`}
                  />

                  {data.airQuality && (
                    <AirQuality data={data.airQuality} />
                  )}
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <HourlyForecast data={data.hourly} />
                  <DailyForecast data={data.daily} />
                </div>
              </div>

              <WeatherDetails current={data.current} />

              {/* SECOND GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ForecastChart data={data.hourly} />

                <div className="space-y-6">
                  <SunriseSunset daily={data.daily} />
                </div>
              </div>

              {/* FOOTER */}
              <AnimatedContainer delay={0.5}>
                <footer className="text-center py-8">
                  <p className="text-xs text-white/35 font-light tracking-wider">
                    Weather data from Open-Meteo
                  </p>
                </footer>
              </AnimatedContainer>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </WeatherBackground>
  );
}

