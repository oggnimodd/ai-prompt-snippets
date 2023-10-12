/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  alias: {
    "@ui": path.resolve(__dirname, "../../packages/ui"),
  },
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
  server: {
    open: false,
  },
});
