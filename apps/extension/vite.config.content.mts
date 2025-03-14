import { defineConfig } from "vite";
import environment from "vite-plugin-environment";
import { WebSocket, WebSocketServer } from "ws";
import packageJson from "./package.json";
import { isDev, r } from "./scripts/utils";
import { sharedConfig } from "./vite/shared-config";

// Create the WebSocketServer only in development mode.
const wss = isDev ? new WebSocketServer({ port: 8990 }) : null;

const broadcast = (data: { type: string }) => {
  if (!wss) return;
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
      console.log("Reloaded content script");
    }
  });
};

const plugins = sharedConfig.plugins ? [...sharedConfig.plugins] : [];

// Define the HMR plugin only for development.
const hmrPlugin = {
  name: "hmr",
  closeBundle: {
    order: "post" as const, // Assert literal type "post"
    sequential: true,
    async handler() {
      broadcast({ type: "reload" });
    },
  },
};

export default defineConfig({
  plugins: [
    environment({
      NODE_ENV: process.env.NODE_ENV,
      EXTENSION: process.env.EXTENSION || "chromium",
      PORT: process.env.PORT || "3303",
    }),
    ...plugins,
    ...(isDev ? [hmrPlugin] : []), // Include only in development
  ],
  define: {
    __DEV__: isDev,
    __NAME__: JSON.stringify(packageJson.name),
  },
  build: {
    watch: isDev ? {} : undefined,
    outDir: r("extension/dist/content-scripts"),
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: isDev ? "inline" : false,
    minify: false,
    lib: {
      entry: r("src/content-scripts/index.ts"),
      name: packageJson.name,
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "index.global.js",
        extend: true,
      },
    },
  },
});
