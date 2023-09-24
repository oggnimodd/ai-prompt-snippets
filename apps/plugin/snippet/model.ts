import { z } from "zod";

export const stringParamSchema = z.object({
  id: z.string(),
  title: z.string().min(3),
  type: z.literal("string"),
});

export const optionsParamSchema = z.object({
  id: z.string(),
  title: z.string().min(3),
  type: z.literal("options"),
  options: z.array(z.string()),
});

export const paramSchema = z.union([stringParamSchema, optionsParamSchema]);

export const snippetSchema = z.object({
  id: z.string(),
  title: z.string(),
  prompt: z.string(),
  parameters: z.array(paramSchema).optional(),
});

export type Snippet = z.infer<typeof snippetSchema>;
export type StringParam = z.infer<typeof stringParamSchema>;
export type OptionsParam = z.infer<typeof optionsParamSchema>;
export type Param = z.infer<typeof paramSchema>;
