import { test, expect } from "../setup";

test("has title", async ({ page, extensionPages }) => {
  const { optionPage } = extensionPages;

  await page.goto(optionPage);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Extension Options/);
});
