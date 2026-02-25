import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { usePhotos } from "./use-photos";

const PEXELS_API_KEY =
  "Mz0iC21IFLz9HuN8ypIbJ54l8OuGnpW2IsVoQrYBEyagQXt1YeBEA7H0";

describe("usePhotos", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should fetch photos successfully", async () => {
    const mockPhotos = [
      { id: 1, photographer: "John", src: { medium: "url1" }, alt: "Photo 1" },
      { id: 2, photographer: "Jane", src: { medium: "url2" }, alt: "Photo 2" },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ photos: mockPhotos, total_results: 2 }),
    });

    const { result } = renderHook(() => usePhotos("nature"));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.photos).toEqual(mockPhotos);
    expect(result.current.error).toBeNull();
  });

  it("should handle API error", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
    });

    const { result } = renderHook(() => usePhotos("nature"));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe("Failed to fetch photos");
  });
});
