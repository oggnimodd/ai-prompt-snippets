import * as content from "./content-scripts";
import type { PlasmoCSConfig } from "plasmo";

export const config: PlasmoCSConfig = {
  matches: [
    "https://chatgpt.com/*",
    "https://poe.com/*",
    "https://claude.ai/*",
    "https://www.perplexity.ai/*",
    "https://gemini.google.com/app/*",
  ],
  all_frames: false,
  run_at: "document_end",
};

export default content;
