import { defineConfig, squooshImageService } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Ai Prompt Snippets",
      social: {
        github: "https://github.com/oggnimodd/ai-prompt-snippets",
      },
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: "Get Started",
              link: "/guides/get-started/",
            },
            {
              label: "Hello World",
              link: "/guides/hello-world/",
            },
          ],
        },
      ],
      favicon: "/images/icon.svg",
      customCss: [
        // Relative path to your custom CSS file
        "./src/styles/custom.css",
      ],
    }),
  ],
  // https://github.com/withastro/astro/issues/8297
  vite: {
    ssr: {
      noExternal: ["execa", "is-stream", "npm-run-path"],
    },
  },
  image: {
    service: squooshImageService(),
  },
});
