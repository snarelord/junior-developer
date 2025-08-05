import { test, expect } from "@playwright/test";

test("Content page loads and renders grouped content correctly", async ({ page }) => {
  const frontendURL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
  await page.goto(frontendURL);

  await page.waitForResponse((response) => response.url().includes("/data") && response.status() === 200);

  const categoryHeadings = page.locator("h2");
  await expect(categoryHeadings.first()).toBeVisible();

  const headingsText = await categoryHeadings.allTextContents();
  expect(headingsText.length).toBeGreaterThan(0);

  const contentCards = page.locator("[class*=card]");
  await expect(contentCards.first()).toBeVisible();

  const links = contentCards.locator("a");
  await expect(links.first()).toHaveAttribute("href", /https?:\/\//);

  const citedSources = page.locator("text=Cited Sources");
  await expect(citedSources.first()).toBeVisible();
});
