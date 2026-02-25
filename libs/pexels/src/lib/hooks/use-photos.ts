import { useState, useEffect } from "react";
import { Photo, PexelsResponse } from "../types";

const PEXELS_API_KEY =
  "Mz0iC21IFLz9HuN8ypIbJ54l8OuGnpW2IsVoQrYBEyagQXt1YeBEA7H0";
const PEXELS_API_URL = "https://api.pexels.com/v1/search";

interface UsePhotosResult {
  photos: Photo[];
  isLoading: boolean;
  error: string | null;
}

export function usePhotos(query: string): UsePhotosResult {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchPhotos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${PEXELS_API_URL}?query=${query}&per_page=10`,
          {
            headers: {
              Authorization: PEXELS_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }

        const data: PexelsResponse = await response.json();
        setPhotos(data.photos);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch photos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [query]);

  return { photos, isLoading, error };
}
