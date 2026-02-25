import { PexelsPhoto, PexelsResponse } from "@tdorsey/pexels";
import { Photo } from "@tdorsey/models";

const getApiUrl = (): string => {
  return process.env.API_URL ?? "https://api.pexels.com/v1/search";
};

export class PhotoServiceError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = "PhotoServiceError";
  }
}

function transformPexelsPhoto(pexelsPhoto: PexelsPhoto): Photo {
  return {
    id: pexelsPhoto.id,
    width: pexelsPhoto.width,
    height: pexelsPhoto.height,
    url: pexelsPhoto.url,
    photographer: pexelsPhoto.photographer,
    photographerUrl: pexelsPhoto.photographer_url,
    photographerId: pexelsPhoto.photographer_id,
    avgColor: pexelsPhoto.avg_color,
    src: pexelsPhoto.src,
    liked: pexelsPhoto.liked,
    alt: pexelsPhoto.alt,
  };
}

export interface SearchPhotosResult {
  photos: Photo[];
  totalResults: number;
  page: number;
  perPage: number;
  nextPage?: string;
}

export interface SearchPhotosParams {
  query: string;
  page?: number;
  perPage?: number;
}

export async function searchPhotos(
  params: SearchPhotosParams
): Promise<SearchPhotosResult> {
  const { query, page = 1, perPage = 10 } = params;

  const apiUrl = new URL(getApiUrl());
  apiUrl.searchParams.set("query", query);
  apiUrl.searchParams.set("page", String(page));
  apiUrl.searchParams.set("per_page", String(perPage));

  const response = await fetch(apiUrl.toString(), {
    headers: {
      Authorization: process.env.API_KEY ?? "",
    },
  });

  if (!response.ok) {
    throw new PhotoServiceError("Failed to fetch photos", response.status);
  }

  const data = (await response.json()) as PexelsResponse;

  return {
    photos: data.photos.map(transformPexelsPhoto),
    totalResults: data.total_results,
    page: data.page,
    perPage: data.per_page,
    nextPage: data.next_page,
  };
}
