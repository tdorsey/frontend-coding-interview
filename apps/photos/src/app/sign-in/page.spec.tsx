import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignInPage from "./page";
import { signIn } from "next-auth/react";

const mockPush = vi.fn();

vi.mock("next-auth/react", () => ({
  signIn: vi.fn(() => Promise.resolve({ ok: true, error: null })),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("SignInPage", () => {
  it("should render sign in form", () => {
    render(<SignInPage />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("should handle form submission", async () => {
    const user = userEvent.setup();

    render(<SignInPage />);

    await user.type(screen.getByLabelText(/email/i), "test@test.com");
    await user.type(screen.getByLabelText(/password/i), "password");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalled();
    });
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/photos");
    });
  });
});
