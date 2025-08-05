import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("renders page header and logo", async ({ page }) => {
    await page.goto(process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000");

    await expect(page.getByRole("heading", { name: "Citizens Advice SORT" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Junior Developer Practical" })).toBeVisible();

    const logo = page.locator('img[alt="Citizens Advice SORT"]');
    await expect(logo).toBeVisible();
  });

  test("renders at least one category section", async ({ page }) => {
    await page.goto(process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000");

    const categories = await page.locator("h2").allTextContents();
    expect(categories.length).toBeGreaterThan(0);
  });

  test("renders at least one Content card with links", async ({ page }) => {
    await page.goto(process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000");

    const card = page.locator("[class*=card]").first();
    await expect(card).toBeVisible();

    const links = card.locator("a");
    await expect(links.first()).toHaveAttribute("href", /https?:\/\//);
  });

  test("renders cited sources if present", async ({ page }) => {
    await page.goto(process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000");

    const citedHeading = page.locator("text=Cited Sources");
    if (await citedHeading.count()) {
      await expect(citedHeading.first()).toBeVisible();
    }
  });

  test("renders additional resources if present", async ({ page }) => {
    await page.goto(process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000");

    const additionalHeading = page.locator("text=Additional Resources");
    if (await additionalHeading.count()) {
      await expect(additionalHeading.first()).toBeVisible();
    }
  });
});
