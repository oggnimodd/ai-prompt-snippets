import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
  },
  video: false,
  screenshotOnRunFailure: false,
});
