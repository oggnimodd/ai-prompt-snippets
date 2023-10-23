import { test, expect } from "../setup";
import type { Snippet } from "../../apps/extension/models/snippet";
import { randomUUID as randomId } from "node:crypto";
import delay from "delay";

test.beforeEach(async ({ page, extensionPages, extensionId }) => {
  // A hack to make chrome object avalaible
  await page.goto(extensionPages.optionPage);
  await page.reload();
});

const snippetExample: Snippet = {
  id: randomId(),
  title: "Hello world",
  prompt: "Repeat hello [name] [count] times",
  parameters: [
    {
      id: randomId(),
      title: "name",
      type: "text",
    },
    {
      id: randomId(),
      title: "count",
      type: "options",
      options: [
        {
          id: randomId(),
          title: "1",
        },
        {
          id: randomId(),
          title: "2",
        },
      ],
    },
  ],
};

// Add new snippet
test("Add new snippet", async ({
  page,
  extensionPages,
  context,
  extensionId,
}) => {
  // Go to option page
  await page.goto(extensionPages.optionPage);

  // Click on add new snippet button
  await page.click("[data-cy='add-snippet-button']");

  expect(page.url()).toBe(extensionPages.addSnippetPage);

  // Fill in the form
  await page
    .locator("[data-cy='snippet-title-input']")
    .fill(snippetExample.title);

  await page
    .locator("[data-cy='snippet-prompt-input']")
    .fill(snippetExample.prompt);

  await page.click("[data-cy='snippet-add-param-button']");

  const params = snippetExample.parameters;

  await page
    .locator(
      "[data-cy='snippet-params-container'] > div:first-child [data-cy='snippet-param-name-input']",
    )
    .fill((params as any)[0].title);

  await page.click("[data-cy='snippet-add-param-button']");

  await page
    .locator(
      "[data-cy='snippet-params-container'] > div:last-child [data-cy='snippet-param-name-input']",
    )
    .fill((params as any)[1].title);

  await page.click(
    "[data-cy='snippet-params-container'] > div:last-child [data-cy='snippet-param-type-input']",
  );

  await page.click("ul[id*='react-aria'] > li:last-child");

  await page.click("[data-cy='snippet-param-add-option-button']");

  await page
    .locator(
      "[data-cy='snippet-params-container'] > div:last-child [data-cy='snippet-option-item'] input",
    )
    .fill((params as any)[1].options[0].title);

  await page.click("[data-cy='snippet-param-add-option-button']");
  await page
    .locator(
      "[data-cy='snippet-params-container'] > div:last-child [data-cy='snippet-option-item']:last-child input",
    )
    .fill((params as any)[1].options[1].title);

  await page.click("[data-cy='snippet-form-submit-button']");

  await delay(200);

  // Check new snippet cards
  const snippetCards = await page.$$("[data-cy='snippet-card']");

  // Length should be 1
  expect(snippetCards.length).toBe(1);

  // Card title should be the same as snippetExample.title
  const cardTitle = await page
    .locator("[data-cy='snippet-card-title']")
    .textContent();
  const cardPromptExcerpt = await page
    .locator("[data-cy='snippet-card-prompt']")
    .textContent();

  expect(cardTitle).toBe(snippetExample.title);
  expect(snippetExample.prompt).toContain(
    cardPromptExcerpt?.replace("...", ""),
  );

  // Check panel page
  await page.goto(extensionPages.panelPage);

  // Get combobox
  await page.locator("input[placeholder='Search snippets']").fill("Hello");

  // Choose the first option
  const optionTitle = await page
    .locator("[data-cy='combobox-option']")
    .textContent();

  expect(optionTitle).toBe(snippetExample.title);

  await page.click("[data-cy='combobox-option']");

  const panelPrompt = await page
    .locator("[data-cy='panel-prompt']")
    .textContent();

  expect(panelPrompt).toBe(snippetExample.prompt);

  await page.locator("[data-cy='panel-textarea']").fill("world 2");

  const msgPromise = page.waitForEvent("console");

  // Add playwright class to body
  await page.evaluate(() => {
    document.body.classList.add("playwright");
  });

  await page.click("[data-cy='panel-submit-button']");

  const msg = await msgPromise;

  expect(msg.text()).toBe("Repeat hello world 2 1 times");
});
