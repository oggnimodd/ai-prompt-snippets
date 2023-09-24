import { Button, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";
import type { Snippet } from "../../snippet/model";
import { useEffect, useState } from "react";
import { SnippetList } from "../components";
import { Plus } from "lucide-react";
import { getLocalStorageValue } from "../../utils/storage";
import { LoadingWithMessage } from "@acme/ui";

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
  const [isLoading, setIsLoading] = useState(true);

  // Todo : use useContext or any state manager library to prevent prop drilling
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  useEffect(() => {
    (async () => {
      const results = await getLocalStorageValue("snippets");
      if (results) {
        setSnippets(results);
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <LoadingWithMessage message="Getting All Your Snippets" />;
  }

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
      <SnippetList
        search={search}
        snippets={snippets}
        setSnippets={setSnippets}
      />
    </>
  );
};

export default Index;
