import { setOrUpdateLocalStorageValue } from "../utils/storage";
import { DEFAULT_PROVIDERS, DEFAULT_THEME } from "../shared/settings";

import { isDev } from "../../scripts/utils";
import browser from "webextension-polyfill";

if (isDev) {
  const ws = new WebSocket("ws://localhost:8989");

  ws.onmessage = (event) => {
    console.log(event);
    const message = JSON.parse(event.data);

    if (message.type === "reload") {
      browser.runtime.reload();
    }
  };

  ws.onerror = (err) => {
    console.error(err);
  };
}

browser.runtime.onMessage.addListener(async (message) => {
  if (message.type === "reload") {
    browser.runtime.reload();
  }
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    // Init settings here

    setOrUpdateLocalStorageValue("theme", DEFAULT_THEME);
    setOrUpdateLocalStorageValue("providers", DEFAULT_PROVIDERS);
  }

  if (details.reason === "update") {
    // Overwrite old chat providers
    setOrUpdateLocalStorageValue("providers", DEFAULT_PROVIDERS);
  }
});
