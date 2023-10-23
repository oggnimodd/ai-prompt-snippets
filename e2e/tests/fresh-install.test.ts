import { test, expect } from "../setup";
import { DEFAULT_PROVIDERS } from "../../apps/extension/shared/settings/index";

test.beforeEach(async ({ page, extensionPages }) => {
  // A hack to make chrome object avalaible
  await page.goto(extensionPages.optionPage);
  await page.reload();
});

// Options page
test("Not Found Message", async ({ page, extensionPages }) => {
  const { optionPage } = extensionPages;

  await page.goto(optionPage);

  const notFoundMessage = await page.waitForSelector(
    "[data-cy='page-message-container']",
  );

  const messageText = await notFoundMessage.textContent();

  expect(await notFoundMessage.isVisible()).toBeTruthy();
  expect(messageText).toContain("No Snippets Found");
});

test("Snippets should be empty", async ({ page, extensionPages }) => {
  const { optionPage } = extensionPages;

  await page.goto(optionPage);

  const snippets = await page.$$('[data-cy="snippet-card"]');

  // snippets should be empty
  expect(snippets.length).toBe(0);
});

// Panel page
test("Not found message", async ({ page, extensionPages }) => {
  const { panelPage } = extensionPages;

  await page.goto(panelPage);

  const notFoundMessage = await page.waitForSelector(
    "[data-cy='empty-panel-message']",
  );

  const messageText = await notFoundMessage.textContent();

  expect(await notFoundMessage.isVisible()).toBeTruthy();
  expect(messageText).toContain("No snippets, you can add new ones");
});

test("Clicking options page links inside panel", async ({
  page,
  extensionPages,
  context,
}) => {
  const { panelPage, optionPage } = extensionPages;

  await page.goto(panelPage);

  // Select all elements matching the options page link selector
  const optionsPageLinks = await page.$$("[data-cy='options-page-link']");

  // Create a promise for the new page
  const pagePromise = context.waitForEvent("page");

  // Iterate through each optionsPageLink and test its behavior
  for (const optionsPageLink of optionsPageLinks) {
    // Click the current optionsPageLink element
    await optionsPageLink.click();

    // Wait for the new page to load
    const newPage = await pagePromise;
    await newPage.waitForLoadState("load");

    // Assert that the URL of the new page matches the expected optionsPage URL
    expect(newPage.url()).toBe(optionPage);
  }
});

// Popup page
test("All switches should be selected", async ({ page, extensionPages }) => {
  const { popupPage } = extensionPages;

  await page.goto(popupPage);

  const switches = await page.$$("[data-selected='true']");

  // expect length to be default providers length
  expect(switches.length).toBe(DEFAULT_PROVIDERS.length);

  // text should be one of the allowed providers
  const providerNames = DEFAULT_PROVIDERS.map((i) => i.name);

  for (const switchElement of switches) {
    const text = await switchElement.textContent();
    expect(providerNames).toContain(text?.toLowerCase());
  }
});
