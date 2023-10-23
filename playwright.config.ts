import { devices, type PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./e2e",
  use: {
    ...devices["Desktop Chrome"],
  },
  reporter: "list",
};

export default config;
