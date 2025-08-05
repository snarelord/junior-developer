import { test, expect } from "@playwright/test";

test("Content loads and displays data", async ({ page }) => {
  await page.goto(process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000");

  await expect(page.locator("text=Loading...")).toBeVisible();

  const categories = await page.locator("h2").allTextContents();
  expect(categories.length).toBeGreaterThan(0);

  const links = page.locator("a");
  await expect(links.first()).toHaveAttribute("href");
});
