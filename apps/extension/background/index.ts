import { setOrUpdateLocalStorageValue } from "../utils/storage";
import { DEFAULT_PROVIDERS, DEFAULT_THEME } from "../shared/settings";

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    // Init settings here

    setOrUpdateLocalStorageValue("theme", DEFAULT_THEME);
    setOrUpdateLocalStorageValue("providers", DEFAULT_PROVIDERS);
  }
});
