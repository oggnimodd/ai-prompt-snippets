import { execSync } from "node:child_process";
import { join } from "node:path";
import chokidar from "chokidar";
import fs from "fs-extra";
import { isDev, port, r } from "./utils";

/**
 * Stub index.html to use Vite in development
 */
async function stubIndexHtml() {
  const views = ["options", "popup", "iframe"];

  for (const view of views) {
    await fs.ensureDir(r(`extension/dist/${view}`));
    let data = await fs.readFile(r(`src/${view}/index.html`), "utf-8");
    data = data
      .replace(
        "</head>",
        '<script type="module" src="/dist/refreshPreamble.js"></script></head>',
      )
      .replace('"./main.tsx"', `"http://localhost:${port}/${view}/main.tsx"`)
      .replace(
        '<div id="app"></div>',
        '<div id="app">Vite server did not start</div>',
      );

    await fs.writeFile(r(`extension/dist/${view}/index.html`), data, "utf-8");

    console.log("stubbed:", view);
  }
}

// This enables hot module reloading
async function writeRefreshPreamble() {
  const data = `
    import RefreshRuntime from "http://localhost:${port}/@react-refresh";
    RefreshRuntime.injectIntoGlobalHook(window);
    window.$RefreshReg$ = () => {};
    window.$RefreshSig$ = () => (type) => type;
    window.__vite_plugin_react_preamble_installed__ = true;
  `;

  await fs.ensureDir(r("extension/dist"));
  await fs.writeFile(
    join(r("extension/dist/"), "refreshPreamble.js"),
    data,
    "utf-8",
  );
}

function writeManifest() {
  execSync("bun run ./scripts/manifest.ts", { stdio: "inherit" });
}

/**
 * Copy assets from the public folder to extension/assets
 * e.g. public/images/shit.png -> extension/assets/images/shit.png
 */
async function copyAssets() {
  await fs.copy(r("public"), r("extension/assets"));
  console.log("Copied public assets to extension/assets");
}

writeManifest();
copyAssets(); // Copy assets initially

if (isDev) {
  writeRefreshPreamble();
  stubIndexHtml();

  // Watch for changes in HTML files and update stubs
  chokidar.watch(r("src/**/*.html")).on("change", () => {
    stubIndexHtml();
  });

  // Watch for changes in manifest and package files
  chokidar.watch([r("manifest.ts"), r("package.json")]).on("change", () => {
    writeManifest();
  });

  // Watch for changes in the public folder and copy assets on the fly
  chokidar.watch(r("public/**/*")).on("change", () => {
    copyAssets();
  });
}
