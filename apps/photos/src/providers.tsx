"use client";

import { SessionProvider } from "next-auth/react";
import { PhotosProvider } from "@/lib/hooks/usePhotos";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PhotosProvider>{children}</PhotosProvider>
    </SessionProvider>
  );
}
