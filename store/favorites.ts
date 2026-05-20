import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { City } from "@/types/weather";

interface FavoritesState {
  favorites: City[];
  addFavorite: (city: City) => void;
  removeFavorite: (city: City) => void;
  isFavorite: (city: City) => boolean;
  reorderFavorites: (cities: City[]) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (city) => {
        const exists = get().favorites.some(
          (f) => f.latitude === city.latitude && f.longitude === city.longitude
        );
        if (!exists && get().favorites.length < 10) {
          set({ favorites: [...get().favorites, city] });
        }
      },
      removeFavorite: (city) => {
        set({
          favorites: get().favorites.filter(
            (f) => !(f.latitude === city.latitude && f.longitude === city.longitude)
          ),
        });
      },
      isFavorite: (city) =>
        get().favorites.some(
          (f) => f.latitude === city.latitude && f.longitude === city.longitude
        ),
      reorderFavorites: (cities) => set({ favorites: cities }),
    }),
    { name: "weather-favorites" }
  )
);
