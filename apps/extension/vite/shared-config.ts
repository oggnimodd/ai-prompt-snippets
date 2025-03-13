import { dirname, relative } from "node:path";
import react from "@vitejs/plugin-react-swc";
import type { UserConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import packageJson from "../package.json";
import { isDev, r } from "../scripts/utils";

export const sharedConfig: UserConfig = {
  root: r("src"),
  resolve: {
    alias: {
      "@/": `${r("src")}/`,
    },
  },
  define: {
    __DEV__: isDev,
    __NAME__: JSON.stringify(packageJson.name),
  },
  plugins: [
    tsconfigPaths(),
    react(),
    // rewrite assets to use relative path
    {
      name: "assets-rewrite",
      enforce: "post",
      apply: "build",
      transformIndexHtml(html, { path }) {
        return html.replace(
          /"\/assets\//g,
          `"${relative(dirname(path), "/assets")}/`,
        );
      },
    },
  ],

  optimizeDeps: {
    include: ["webextension-polyfill"],
  },
};
