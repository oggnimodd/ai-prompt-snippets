import { test as base, chromium, type BrowserContext } from "@playwright/test";
import path from "path";

const createExtensionUrl = (path: string) => {
  return `chrome-extension://${path}`;
};

const isHeadless = !!process.env.CI || !!process.env.PLAYWRIGHT_HEADLESS;

// Extension pages to test
type ExtensionPages = {
  optionPage: string;
  popupPage: string;
  panelPage: string;
  addSnippetPage: string;
};

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
  extensionPages: ExtensionPages;
}>({
  // biome-ignore lint/correctness/noEmptyPattern: <explanation>
  context: async ({}, use) => {
    const pathToExtension = path.join(
      process.cwd(),
      "apps",
      "extension",
      "dist",
    );

    const flags = [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
    ];

    if (isHeadless) {
      flags.unshift("--headless=new");
    }

    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: flags,
    });
    await use(context);
    await context.close();
  },
  extensionId: async ({ context }, use) => {
    /*
    // for manifest v2:
    let [background] = context.backgroundPages()
    if (!background)
      background = await context.waitForEvent('backgroundpage')
    */

    // for manifest v3:
    let [background] = context.serviceWorkers();

    if (!background) background = await context.waitForEvent("serviceworker");

    const extensionId = background.url().split("/")[2];

    if (!extensionId) throw "extensionId is not valid";

    await use(extensionId);
  },
  extensionPages: async ({ context, extensionId }, use) => {
    await use({
      optionPage: createExtensionUrl(`${extensionId}/options/index.html#/`),
      popupPage: createExtensionUrl(`${extensionId}/popup/index.html`),
      panelPage: createExtensionUrl(`${extensionId}/iframe/index.html`),
      addSnippetPage: createExtensionUrl(
        `${extensionId}/options/index.html#/add`,
      ),
    });
  },
});

export const expect = test.expect;
