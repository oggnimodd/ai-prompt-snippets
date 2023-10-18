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
          label: "Start Here",
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: "Introduction",
              link: "/getting-started/get-started/",
            },
            {
              label: "Download",
              link: "/getting-started/download/",
            },
            {
              label: "Supported Platforms",
              link: "/getting-started/supported-platforms/",
            },
          ],
        },
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
        {
          label: "Settings",
          autogenerate: { directory: "settings" },
        },
        {
          label: "Additional Information",
          autogenerate: { directory: "additional-information" },
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
