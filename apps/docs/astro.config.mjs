import { defineConfig, squooshImageService } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Ai Chat Snippet",
      social: {
        github: "https://github.com/oggnimodd/ai-chat-snippet",
      },
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Get Started", link: "/guides/get-started/" },
            { label: "Hello World", link: "/guides/hello-world/" },
          ],
        },
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
