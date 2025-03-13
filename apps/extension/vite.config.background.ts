import { defineConfig } from "vite";
import environment from "vite-plugin-environment";
import { WebSocket, WebSocketServer } from "ws";
import packageJson from "./package.json";
import { isDev, r } from "./scripts/utils";
import { sharedConfig } from "./vite/shared-config";

const wss = new WebSocketServer({ port: 8989 });

const broadcast = (data: {
  type: string;
}) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
      console.log("Reloaded background script");
    }
  });
};

const plugins = sharedConfig.plugins ? [...sharedConfig.plugins] : [];

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
  },
  build: {
    watch: isDev ? {} : undefined,
    outDir: r("extension/dist/background"),
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: isDev ? "inline" : false,
    lib: {
      entry: r("src/background/index.ts"),
      name: packageJson.name,
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "index.mjs",
        extend: true,
      },
    },
  },
});
