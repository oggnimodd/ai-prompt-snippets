import { dirname, relative } from "node:path";
import react from "@vitejs/plugin-react-swc";
import type { Plugin, UserConfig } from "vite";
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
    __NAME__: JSON.stringify(packageJson.name),
  },
  plugins: [
    tsconfigPaths(),
    react(),
    // Only include the replace-dev plugin in production builds
    ...(!isDev
      ? [
          {
            name: "replace-dev",
            enforce: "pre" as const,
            transform(code: string, id: string) {
              if (!id.includes("node_modules")) {
                return code.replace(/__DEV__/g, JSON.stringify(isDev));
              }
              return code;
            },
          } as Plugin,
        ]
      : []),
    // Rewrite assets to use relative path
    {
      name: "assets-rewrite",
      enforce: "post" as const,
      apply: "build",
      transformIndexHtml(html, { path }) {
        return html.replace(
          /"\/assets\//g,
          `"${relative(dirname(path), "/assets")}/`,
        );
      },
    } as Plugin,
  ],

  optimizeDeps: {
    include: ["webextension-polyfill"],
  },
};
