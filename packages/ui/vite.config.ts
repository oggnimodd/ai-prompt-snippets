import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@ui",
        replacement: fileURLToPath(new URL(".", import.meta.url)),
      },
    ],
  },
  define: {
    "process.env": process.env,
  },
  envPrefix: ["NEXT_", "VITE_"],
  publicDir: "public",
  server: {
    port: 61000,
    open: false,
  },
});
