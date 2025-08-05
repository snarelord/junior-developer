import { test, expect } from "@playwright/test";

test("Content loads and displays data", async ({ page }) => {
  const url = process.env.NEXT_PUBLIC_FRONTEND_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_FRONTEND_URL is not defined");
  }
  await page.goto(url);

  await expect(page.locator("text=Loading...")).toBeVisible();

  const categories = await page.locator("h2").allTextContents();
  expect(categories.length).toBeGreaterThan(0);

  const links = page.locator("a");
  await expect(links.first()).toHaveAttribute("href");
});
