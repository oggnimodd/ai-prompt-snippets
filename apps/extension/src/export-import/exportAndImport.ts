import {
  getLocalStorageValue,
  setOrUpdateLocalStorageValue,
} from "../utils/storage";
import { snippetsFileSchema, type SnippetsFile } from "../models/file";
import { saveAs } from "file-saver";
import { nanoid } from "nanoid";
import type { Snippet } from "models/snippet";

export const exportSnippets = async (singleSnippet?: Snippet) => {
  const snippets = (await getLocalStorageValue("snippets")) as Snippet[];

  if (!snippets || snippets.length === 0) {
    return;
  }

  const forExporting: SnippetsFile = {
    version: "0",
    snippets: singleSnippet ? [singleSnippet] : snippets,
  };

  // Create a blob of the data
  const fileToSave = new Blob([JSON.stringify(forExporting)], {
    type: "application/json",
  });

  const fileName = singleSnippet
    ? `${singleSnippet.title.toLowerCase().replace(" ", "-")}-${nanoid(6)}`
    : `ai-prompt-snippets-${nanoid(10)}.json`;

  // Save the file
  saveAs(fileToSave, fileName);
};

export const importSnippets = async (snippetsFile: unknown) => {
  // Validate JSON using snippetsFileSchema
  const results = snippetsFileSchema.safeParse(snippetsFile);

  if (results.success) {
    const data = results.data;
    console.log("Snippets File Version : ", data.version);

    const newSnippets = data.snippets.map((snippet) => {
      return {
        ...snippet,
        id: nanoid(),
      };
    });

    // Concat newSnippets with existing snippets
    const existingSnippets = (await getLocalStorageValue("snippets")) || [];

    const snippets = [...existingSnippets, ...newSnippets];
    setOrUpdateLocalStorageValue("snippets", snippets);
  } else {
    // Throw with message
    throw new Error(results.error.message);
  }
};
