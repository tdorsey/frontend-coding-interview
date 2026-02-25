import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PhotosPage from "./page";
import { Photo } from "@tdorsey/models";

vi.mock("@tdorsey/shared", () => ({
  LinksSvg: () => null,
}));

const mockPhotos: Photo[] = [
  {
    id: 1,
    src: {
      medium: "url1",
      original: "",
      large2x: "",
      large: "",
      small: "",
      portrait: "",
      landscape: "",
      tiny: "",
    },
    alt: "Nature 1",
    liked: false,
    url: "",
    photographer: "",
    photographerUrl: "",
    photographerId: 1,
    avgColor: "#000000",
    width: 100,
    height: 100,
  },
  {
    id: 2,
    src: {
      medium: "url2",
      original: "",
      large2x: "",
      large: "",
      small: "",
      portrait: "",
      landscape: "",
      tiny: "",
    },
    alt: "Nature 2",
    liked: true,
    url: "",
    photographer: "",
    photographerUrl: "",
    photographerId: 2,
    avgColor: "#ffffff",
    width: 100,
    height: 100,
  },
];

vi.mock("@/lib/hooks/usePhotos", () => ({
  usePhotos: () => ({ photos: mockPhotos, isLoading: false, error: null }),
}));

vi.mock("next-auth/react", () => ({
  useSession: () => ({ data: null, status: "unauthenticated" }),
  signOut: vi.fn(),
}));

describe("PhotosPage", () => {
  it("should render photos", () => {
    render(<PhotosPage />);

    expect(screen.getByAltText("Nature 1")).toBeInTheDocument();
    expect(screen.getByAltText("Nature 2")).toBeInTheDocument();
  });

  it("should toggle like on click", async () => {
    const user = userEvent.setup();
    render(<PhotosPage />);

    const likeButtons = screen.getAllByRole("button", { name: /Like photo/i });
    await user.click(likeButtons[0]);
  });
});
