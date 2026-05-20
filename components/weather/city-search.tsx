"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, X } from "lucide-react";
import { searchCities } from "@/lib/geocoding";
import { useWeatherStore } from "@/store/weather";
import { useFavoritesStore } from "@/store/favorites";
import type { City } from "@/types/weather";

export default function CitySearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<City[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const setSelectedCity = useWeatherStore((s) => s.setSelectedCity);
  const { addFavorite } = useFavoritesStore();

  const doSearch = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      return;
    }
    setIsSearching(true);
    const cities = await searchCities(q);
    setResults(cities);
    setIsSearching(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleGeolocate = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { reverseGeocode } = await import("@/lib/geocoding");
        const city = await reverseGeocode(
          pos.coords.latitude,
          pos.coords.longitude
        );

        if (city) {
          setSelectedCity(city);
          setIsOpen(false);
          setQuery("");
        }
      },
      () => {
        setSelectedCity({
          name: "New York",
          latitude: 40.7128,
          longitude: -74.006,
          country: "US",
        });
      }
    );
  };

  const selectCity = (city: City) => {
    setSelectedCity(city);
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      {/* INPUT */}
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-4 h-4 text-white/40 pointer-events-none" />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search city..."
          className="w-full h-11 pl-11 pr-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
        />

        <div className="absolute right-2 flex items-center gap-1">
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-white/50" />
            </button>
          )}

          <button
            onClick={handleGeolocate}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            title="Use current location"
          >
            <MapPin className="w-4 h-4 text-white/50" />
          </button>
        </div>
      </div>

      {/* RESULTS */}
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-white/15 overflow-hidden z-50 shadow-xl"
          >
            {results.map((city) => (
              <motion.div
                key={`${city.latitude}-${city.longitude}`}
                onClick={() => selectCity(city)}
                role="button"
                tabIndex={0}
                className="w-full px-4 py-3 text-left hover:bg-white/15 transition-colors flex items-center justify-between group"
              >
                {/* CITY INFO */}
                <div>
                  <p className="text-sm text-white/90 font-medium">
                    {city.name}
                  </p>
                  <p className="text-xs text-white/40">
                    {city.admin1 ? `${city.admin1}, ` : ""}
                    {city.country}
                  </p>
                </div>

                {/* FAVORITE BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    addFavorite(city);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full hover:bg-white/10"
                  title="Add to favorites"
                >
                  <MapPin className="w-3.5 h-3.5 text-white/50" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}