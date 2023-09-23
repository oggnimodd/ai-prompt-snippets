import { Button, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";
import type { Snippet } from "../../snippet/model";
import { useState } from "react";
import { SnippetList } from "../components";
import { Plus } from "lucide-react";

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

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
  };

  const clearSearch = () => {
    setSearch("");
  };

  return { search, onSearchChange, clearSearch };
};

const Index = () => {
  const { search, onSearchChange, clearSearch } = useSearchSnippet();

  return (
    <>
      <div className="my-4 py-3 flex flex-wrap justify-between gap-x-4 gap-y-2 items-end">
        <Input
          onClear={clearSearch}
          onChange={onSearchChange}
          placeholder="Find Snippet"
          labelPlacement="outside"
          isClearable
          classNames={{
            base: "w-auto self-start",
          }}
        />

        <Button
          startContent={<Plus size={18} />}
          className="self-auto"
          as={Link}
          color="primary"
          to="/add"
        >
          Add New
        </Button>
      </div>
      <SnippetList search={search} snippets={snippets} />
    </>
  );
};

export default Index;
