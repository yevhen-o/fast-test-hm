import { test, expect } from "@playwright/test";
test.describe("test book page", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/private", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        json: [
          { name: "a", author: "b" },
          { name: "c", author: "d" },
        ],
      });
    });
    await page.route("**/yevhen/", (route) => {
      if (route.request().method() === "GET") {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          json: [
            { name: "a", author: "b" },
            { name: "c", author: "d" },
            { name: "e", author: "f" },
          ],
        });
      }
      if (route.request().method() === "POST") {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          json: { name: "a", author: "b" },
        });
      }
    });
    await page.goto("/");
  });
  test("has heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Books repository" })
    ).toBeVisible();
  });

  test("show correct private books count", async ({ page }) => {
    await expect(page.getByRole("banner")).toContainText(
      "Your private books count is: 2"
    );

    await expect(page.locator(".book")).toHaveCount(3);
  });

  test("show private books", async ({ page }) => {
    await page.locator("#fPrivate").click();

    await expect(page.locator(".book")).toHaveCount(2);
  });

  test("can perform add book", async ({ page }) => {
    await expect(page.locator(".book")).toHaveCount(3);
    await page.getByRole("button", { name: "Add" }).click();
    await page.locator("[name='name']").fill("Book name");
    await page.locator("[name='author']").fill("Book author");
    await page.getByRole("button", { name: "Add book" }).click();
    await expect(page.locator(".book")).toHaveCount(4);
  });
});
