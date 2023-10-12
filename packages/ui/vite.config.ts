import path from "path";
import queryString from "query-string";
import { defineConfig, type ViteDevServer } from "vite";

const mapNextJsAssets = {
  name: "map-next-js-assets",
  configureServer(server: ViteDevServer) {
    server.middlewares.use("/", (req, res, next) => {
      const params = queryString.parse(req.url as string) || {};
      const nextImageUrl = params["/_next/image?url"] as string;

      if (nextImageUrl) {
        req.url = `/@fs/${path.resolve(
          __dirname,
          `public${nextImageUrl.replaceAll("/", "\\")}`,
        )}`;
      }

      next();
    });
  },
};

export default defineConfig({
  resolve: {
    alias: {
      "next/original-image": require.resolve("next/image"),
      "next/image": path.resolve(__dirname, "./.ladle/UnoptimizedImage.tsx"),
    },
  },
  define: {
    "process.env": process.env,
  },
  envPrefix: ["NEXT_", "VITE_"],
  publicDir: "public",
  plugins: [mapNextJsAssets],
  server: {
    port: 61000,
    open: false,
  },
});
