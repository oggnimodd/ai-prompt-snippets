import { defineConfig } from "vite";
import { isDev, port, r } from "./scripts/utils";
import { sharedConfig } from "./vite/shared-config";

export default defineConfig(({ command }) => ({
  ...sharedConfig,
  base: command === "serve" ? `http://localhost:${port}/` : "/dist/",
  server: {
    port,
    hmr: {
      host: "localhost",
    },
    origin: `http://localhost:${port}`,
    cors: {
      // Allow your chrome extension to access the dev server resources
      origin: "chrome-extension://ophdafkokneajgngmffccmcimpjimjpe",
    },
  },
  build: {
    watch: isDev ? {} : undefined,
    outDir: r("extension/dist"),
    emptyOutDir: false,
    sourcemap: isDev ? "inline" : false,
    minify: "terser",
    // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
    terserOptions: {
      mangle: false,
    },
    rollupOptions: {
      input: {
        options: r("src/options/index.html"),
        popup: r("src/popup/index.html"),
        iframe: r("src/iframe/index.html"),
      },
      // Silent next ui's warning about use client directive
      onwarn: (warning, warn) => {
        // Filter warnings that mention module-level directives
        if (
          warning.message.includes(
            "Module level directives cause errors when bundled",
          )
        ) {
          return;
        }
        // Otherwise, use default warning handler
        warn(warning);
      },
    },
  },
}));
