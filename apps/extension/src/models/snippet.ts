import { z } from "zod";

export const optionSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, "Title must have at least 1 character")
    .max(255, "Title must have at most 255 characters"),
});

export const stringParamSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(3, "Title must have at least 3 characters")
    .max(255, "Title must have at most 255 characters"),
  type: z.literal("text"),
});

export const optionsParamSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(3, "Title must have at least 3 characters")
    .max(255, "Title must have at most 255 characters"),
  type: z.literal("options"),
  options: z.array(optionSchema).nonempty("Options array must not be empty"),
});

export const paramSchema = z.union([stringParamSchema, optionsParamSchema]);

export const snippetSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, "Title must have at least 1 character")
    .max(255, "Title must have at most 255 characters"),
  prompt: z
    .string()
    .min(1, "Prompt must have at least 1 character")
    .max(10000, "Prompt must have at most 10000 characters"),
  parameters: z.array(paramSchema).optional(),
});

export type Snippet = z.infer<typeof snippetSchema>;
export type StringParam = z.infer<typeof stringParamSchema>;
export type OptionsParam = z.infer<typeof optionsParamSchema>;
export type Option = z.infer<typeof optionSchema>;
export type Param = z.infer<typeof paramSchema>;
