// This model is needed for validating imported snippets

import { snippetSchema } from "./snippet";
import { z } from "zod";

export const snippetsFileSchema = z.object({
  version: z.string(),
  snippets: z.array(snippetSchema),
});

export type SnippetsFile = z.infer<typeof snippetsFileSchema>;
