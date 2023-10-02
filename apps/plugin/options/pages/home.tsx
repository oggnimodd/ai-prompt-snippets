import { Button, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { SnippetList } from "../components";
import { Plus } from "lucide-react";
import { LoadingWithMessage } from "@acme/ui";
import { useSearchSnippets, useSnippets } from "../hooks";

const Index = () => {
  const { search, onSearchChange, clearSearch } = useSearchSnippets();
  const { isLoading, snippets, setSnippets } = useSnippets();

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
