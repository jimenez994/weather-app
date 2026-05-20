import type { City } from "@/types/weather";

interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export async function searchCities(query: string): Promise<City[]> {
  if (!query || query.length < 2) return [];

  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
  );

  if (!res.ok) return [];

  const data = await res.json();
  if (!data.results) return [];

  return data.results.map((r: GeocodingResult) => ({
    name: r.name,
    latitude: r.latitude,
    longitude: r.longitude,
    country: r.country,
    admin1: r.admin1,
  }));
}

export async function reverseGeocode(latitude: number, longitude: number): Promise<City | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=10`
    );

    if (!res.ok) return null;
    const data = await res.json();

    const name =
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.municipality ||
      data.address?.county ||
      "Unknown Location";

    return {
      name,
      latitude,
      longitude,
      country: data.address?.country ?? "Unknown",
      admin1: data.address?.state,
    };
  } catch {
    return { name: "Current Location", latitude, longitude, country: "" };
  }
}
