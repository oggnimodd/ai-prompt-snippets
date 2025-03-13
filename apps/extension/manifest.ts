import fs from "fs-extra";
import type { Manifest } from "webextension-polyfill";
import type PkgType from "./package.json";
import { isDev, isFirefox, port, r } from "./scripts/utils";

export async function getManifest() {
  const pkg = (await fs.readJSON(r("package.json"))) as typeof PkgType;

  // update this file to update this manifest.json
  // can also be conditional based on your need
  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 3,
    name: "Ai Prompt Snippets",
    version: pkg.version,
    description:
      "A browser extension that allows you to create and manage snippets of AI prompts.",
    action: {
      default_icon: "./assets/images/icon-128.png",
      default_popup: "./dist/popup/index.html",
    },
    options_ui: {
      page: "./dist/options/index.html",
      open_in_tab: true,
    },
    background: isFirefox
      ? {
          scripts: ["dist/background/index.mjs"],
          type: "module",
        }
      : {
          service_worker: "./dist/background/index.mjs",
        },
    icons: {
      16: "./assets/images/icon-48.png",
      48: "./assets/images/icon-48.png",
      128: "./assets/images/icon-128.png",
    },
    permissions: ["storage", "activeTab"],
    host_permissions: [
      "https://chatgpt.com/*",
      "https://poe.com/*",
      "https://claude.ai/*",
      "https://www.perplexity.ai/*",
      "https://gemini.google.com/app/*",
    ],
    content_scripts: [
      {
        matches: [
          "https://chatgpt.com/*",
          "https://poe.com/*",
          "https://claude.ai/*",
          "https://www.perplexity.ai/*",
          "https://gemini.google.com/app/*",
        ],
        js: ["dist/content-scripts/index.global.js"],
        all_frames: false,
        run_at: "document_end",
      },
    ],
    web_accessible_resources: [
      {
        resources: [
          "dist/iframe/index.html",
          "assets/images/icon.svg",
          "assets/images/icon-48.png",
          "assets/images/icon-128.png",
        ],
        matches: ["<all_urls>"],
      },
    ],
    content_security_policy: {
      extension_pages: isDev
        ? // this is required on dev for Vite script to load
          `script-src \'self\' http://localhost:${port}; object-src \'self\'`
        : "script-src 'self'; object-src 'self'",
    },
  };

  return manifest;
}
