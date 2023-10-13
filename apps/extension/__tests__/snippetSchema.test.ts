import { expect, it, test } from "vitest";
import { snippetSchema, Snippet } from "../models/snippet";
import { nanoid } from "nanoid";

export const correctSnippetExample: Snippet = {
  id: nanoid(),
  title: "Word definition",
  prompt: "What is the definition of the word [word] in [language]?",
  parameters: [
    {
      id: nanoid(),
      title: "word",
      type: "string",
    },
    {
      id: nanoid(),
      title: "language",
      type: "options",
      options: [
        {
          id: nanoid(),
          title: "English",
        },
        {
          id: nanoid(),
          title: "France",
        },
        {
          id: nanoid(),
          title: "Italian",
        },
      ],
    },
  ],
};

export const wrongSnippetExample = {
  title: "Word definition",
  prompt: "What is the definition of the word [word] in [language]?",
  parameters: {
    title: "word",
    default: "Example",
    type: "invalidType",
  },
};

// Generate vitest test
test("Success on a valid snippet", () => {
  const results = snippetSchema.safeParse(correctSnippetExample);
  expect(results.success).to.be.equal(true);
});

test("Failed on an invalid snippet", () => {
  const results = snippetSchema.safeParse(wrongSnippetExample);
  expect(results.success).to.be.equal(false);
});
