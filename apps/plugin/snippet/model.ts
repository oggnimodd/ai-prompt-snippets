import { z } from "zod";

export const stringParamSchema = z.object({
  title: z.string(),
  default: z.string().optional(),
  type: z.literal("string"),
});

export const optionsParamSchema = z.object({
  title: z.string(),
  default: z.string().optional(),
  type: z.literal("options"),
  options: z.array(z.string()),
  multiple: z.boolean().default(false).optional(),
});

export const paramSchema = z.union([stringParamSchema, optionsParamSchema]);

export const snippetSchema = z.object({
  title: z.string(),
  prompt: z.string(),
  parameters: z.array(paramSchema).optional(),
});

export type Snippet = z.infer<typeof snippetSchema>;
export type StringParam = z.infer<typeof stringParamSchema>;
export type OptionsParam = z.infer<typeof optionsParamSchema>;
export type Param = z.infer<typeof paramSchema>;
