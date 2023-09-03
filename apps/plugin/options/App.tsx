import { TextField, Button } from "@acme/ui";
import { SnippetList } from "./components";
import type { Snippet } from "../snippet/model";
import { useState } from "react";

const snippets: Snippet[] = [
  {
    title: "Book Summary",
    prompt: "Provide a detailed summary of the book [title] by [author]",
    parameters: [
      {
        title: "title",
        type: "string",
      },
      {
        title: "author",
        type: "string",
      },
    ],
  },

  {
    title: "Movie Review",
    prompt:
      "Write a critical review of the film [title] directed by [director]",
    parameters: [
      {
        title: "title",
        type: "string",
      },
      {
        title: "director",
        type: "string",
      },
    ],
  },

  {
    title: "Recipe",
    prompt:
      "Provide the ingredients and step-by-step instructions to make [dish]",
    parameters: [
      {
        title: "dish",
        type: "string",
      },
    ],
  },
  {
    title: "Product Description",
    prompt:
      "Write a detailed product description for [product] highlighting its key features and benefits",
    parameters: [
      {
        title: "product",
        type: "string",
      },
    ],
  },

  {
    title: "Business Pitch",
    prompt:
      "Create a one minute elevator pitch for [business] to use when introducing the business",
    parameters: [
      {
        title: "business",
        type: "string",
      },
    ],
  },

  {
    title: "Research Summary",
    prompt:
      "Summarize the key findings from the research paper [title] by [author]",
    parameters: [
      {
        title: "title",
        type: "string",
      },
      {
        title: "author",
        type: "string",
      },
    ],
  },
];

// Search snippet using query
const useSearchSnippet = () => {
  const [search, setSearch] = useState("");

  // Handle input field changes
  const onSearchChange = (value: string) => {
    setSearch(value);
  };

  return { search, onSearchChange };
};

const App = () => {
  const { search, onSearchChange } = useSearchSnippet();

  return (
    <div className="flex w-full text-base bg-background-500">
      <div className="w-full min-h-screen text-white mx-auto max-w-[1100px] px-20 xl:px-0">
        <div className="my-4 py-3 flex flex-wrap justify-between gap-x-4 gap-y-2 items-end">
          <TextField
            onChange={onSearchChange}
            className="w-full"
            placeholder="Find Snippet"
          />
          <Button className="self-auto">+ Add New</Button>
        </div>
        <SnippetList search={search} snippets={snippets} />
      </div>
    </div>
  );
};

export default App;
