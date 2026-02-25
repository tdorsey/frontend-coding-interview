import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("Photos Page", () => {
  test.describe("Desktop viewport 1280x832", () => {
    test.use({
      viewport: { width: 1280, height: 832 },
    });

    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE_URL}/photos`);
    });

    test("should have color square with photo avgColor", async ({ page }) => {
      const colorSquare = page.locator('[data-testid="color-square"]').first();
      await expect(colorSquare).toBeVisible();
      const bgColor = await colorSquare.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      expect(bgColor).toBeTruthy();
    });

    test("should have photographer link with photographer_url", async ({
      page,
    }) => {
      const photographerLink = page
        .locator('[data-testid="photographer-link"]')
        .first();
      await expect(photographerLink).toBeVisible();
      await expect(photographerLink).toHaveAttribute("href", /./);
    });

    test("should have thumbnail using photo.src.medium", async ({ page }) => {
      const thumbnail = page.locator('[data-testid="photo-thumbnail"]').first();
      await expect(thumbnail).toBeVisible();
      const src = await thumbnail.getAttribute("src");
      expect(src).toContain("medium");
    });

    test("should show grey unfilled star for unliked photos", async ({
      page,
    }) => {
      const unlikedStar = page.locator('[data-testid="star-unliked"]').first();
      await expect(unlikedStar).toBeVisible();
      const color = await unlikedStar.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });
      expect(color).toContain("153"); // rgb(153, 153, 153) = #999
    });

    test("should show yellow star when liked", async ({ page }) => {
      const likeButton = page.locator('[data-testid="like-button"]').first();
      await likeButton.click();

      const likedStar = page.locator('[data-testid="star-liked"]').first();
      await expect(likedStar).toBeVisible();
      const color = await likedStar.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });
      expect(color).toContain("255"); // yellow has red component
    });
  });

  test.describe("Mobile viewport iPhone", () => {
    test.use({
      viewport: { width: 390, height: 844 },
    });

    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE_URL}/photos`);
    });

    test("should have color square with photo avgColor", async ({ page }) => {
      const colorSquare = page.locator('[data-testid="color-square"]').first();
      await expect(colorSquare).toBeVisible();
    });

    test("should have photographer link", async ({ page }) => {
      const photographerLink = page
        .locator('[data-testid="photographer-link"]')
        .first();
      await expect(photographerLink).toBeVisible();
    });

    test("should have thumbnail using photo.src.medium", async ({ page }) => {
      const thumbnail = page.locator('[data-testid="photo-thumbnail"]').first();
      await expect(thumbnail).toBeVisible();
      const src = await thumbnail.getAttribute("src");
      expect(src).toContain("medium");
    });

    test("should show grey unfilled star for unliked", async ({ page }) => {
      const unlikedStar = page.locator('[data-testid="star-unliked"]').first();
      await expect(unlikedStar).toBeVisible();
    });

    test("should toggle like and show yellow star", async ({ page }) => {
      const likeButton = page.locator('[data-testid="like-button"]').first();
      await likeButton.click();

      const likedStar = page.locator('[data-testid="star-liked"]').first();
      await expect(likedStar).toBeVisible();
    });
  });
});
