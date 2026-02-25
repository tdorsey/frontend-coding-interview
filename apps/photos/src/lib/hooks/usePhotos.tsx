"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { searchPhotos } from "@tdorsey/photo-service";
import { Photo } from "@tdorsey/models";

interface PhotosContextType {
  photos: Photo[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const PhotosContext = createContext<PhotosContextType | undefined>(undefined);

export function PhotosProvider({ children }: { children: ReactNode }) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await searchPhotos({ query: "nature", perPage: 10 });
      setPhotos(result.photos);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch photos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <PhotosContext.Provider
      value={{ photos, isLoading, error, refetch: fetchPhotos }}
    >
      {children}
    </PhotosContext.Provider>
  );
}

export function usePhotos() {
  const context = useContext(PhotosContext);
  if (context === undefined) {
    throw new Error("usePhotos must be used within a PhotosProvider");
  }
  return context;
}
