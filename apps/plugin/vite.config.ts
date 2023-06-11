/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), crx({ manifest })],
  test: {
    globals: true,
    environment: "jsdom",
    transformMode: {
      web: [/\.jsx?$/],
    },
  },
  define: {
    "process.env": process.env,
  },
});
