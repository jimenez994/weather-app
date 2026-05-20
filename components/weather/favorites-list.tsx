"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";
import { useFavoritesStore } from "@/store/favorites";
import { useWeatherStore } from "@/store/weather";
import type { City } from "@/types/weather";

export default function FavoritesList() {
  const { favorites, removeFavorite } = useFavoritesStore();
  const { selectedCity, setSelectedCity } = useWeatherStore();

  if (favorites.length === 0) return null;

  const selectCity = (city: City) => {
    if (city.latitude === selectedCity.latitude && city.longitude === selectedCity.longitude) return;
    setSelectedCity(city);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
      <AnimatePresence>
        {favorites.map((city, index) => {
          const isActive =
            city.latitude === selectedCity.latitude && city.longitude === selectedCity.longitude;
          return (
            <motion.div
              key={`fav-${city.latitude}-${city.longitude}`}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => selectCity(city)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") selectCity(city);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all border backdrop-blur-xl shrink-0 cursor-pointer ${
                isActive
                  ? "bg-white/20 border-white/30 text-white shadow-lg"
                  : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white/85"
              }`}
            >
              <Star
                className={`w-3.5 h-3.5 ${isActive ? "fill-amber-300 text-amber-300" : "text-white/40"}`}
              />
              {city.name}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(city);
                }}
                className="ml-1 p-0.5 rounded-full hover:bg-white/10 transition-colors"
                aria-label={`Remove ${city.name} from favorites`}
              >
                <X className="w-3 h-3 text-white/40" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
