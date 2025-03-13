import { defineConfig } from "vite";
import environment from "vite-plugin-environment";
import { WebSocket, WebSocketServer } from "ws";
import packageJson from "./package.json";
import { isDev, r } from "./scripts/utils";
import { sharedConfig } from "./vite/shared-config";

const wss = new WebSocketServer({ port: 8990 });

const broadcast = (data: {
  type: string;
}) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
      console.log("Reloaded content script");
    }
  });
};

const plugins = sharedConfig.plugins ? [...sharedConfig.plugins] : [];

// bundling the content script using Vite
export default defineConfig({
  plugins: [
    environment({
      NODE_ENV: process.env.NODE_ENV,
      EXTENSION: process.env.EXTENSION || "chromium",
      PORT: process.env.PORT || "3303",
    }),
    ...plugins,
    {
      name: "hmr",
      closeBundle: {
        order: "post",
        sequential: true,
        async handler() {
          broadcast({ type: "reload" });
        },
      },
    },
  ],
  define: {
    __DEV__: isDev,
    __NAME__: JSON.stringify(packageJson.name),
    // https://github.com/vitejs/vite/issues/9320
    // https://github.com/vitejs/vite/issues/9186
  },
  build: {
    watch: isDev ? {} : undefined,
    outDir: r("extension/dist/content-scripts"),
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: isDev ? "inline" : false,
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
