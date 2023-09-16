import { expect, it, test } from "vitest";
import { snippetSchema, Snippet } from "../snippet/model";

export const correctSnippetExample: Snippet = {
  title: "Word definition",
  prompt: "What is the definition of the word [word] in [language]?",
  parameters: [
    {
      title: "word",
      default: "Example",
      type: "string",
    },
    {
      title: "language",
      default: "English",
      type: "options",
      options: ["English", "Japanese", "Spanish"],
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
