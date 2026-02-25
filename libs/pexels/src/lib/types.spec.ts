import { describe, it, expect } from "vitest";
import { PexelsPhoto, PexelsResponse } from "./types";

describe("Photo type", () => {
  it("should have correct shape", () => {
    const photo: PexelsPhoto = {
      id: 1,
      width: 1000,
      height: 667,
      url: "https://example.com/photo",
      photographer: "John Doe",
      photographer_url: "https://example.com/photographer",
      photographer_id: 123,
      avg_color: "#FFFFFF",
      src: {
        original: "https://example.com/original.jpg",
        large2x: "https://example.com/large2x.jpg",
        large: "https://example.com/large.jpg",
        medium: "https://example.com/medium.jpg",
        small: "https://example.com/small.jpg",
        portrait: "https://example.com/portrait.jpg",
        landscape: "https://example.com/landscape.jpg",
        tiny: "https://example.com/tiny.jpg",
      },
      liked: false,
      alt: "A beautiful nature photo",
    };
    expect(photo.id).toBe(1);
    expect(photo.photographer).toBe("John Doe");
  });
});
