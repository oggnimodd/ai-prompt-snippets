import { Button, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { SnippetList } from "../components";
import { Download, Plus, Upload } from "lucide-react";
import { LoadingWithMessage } from "@acme/ui";
import { useImportSnippets, useSearchSnippets, useSnippets } from "../hooks";
import { exportSnippets } from "../../export-import";

const Index = () => {
  const { chooseSnippetsFile } = useImportSnippets();
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
        <div className="self-auto flex items-center gap-3 flex-wrap">
          <Button
            onPress={() => chooseSnippetsFile()}
            startContent={<Download size={18} />}
            color="primary"
          >
            Import
          </Button>
          <Button
            onPress={exportSnippets}
            startContent={<Upload size={18} />}
            color="primary"
          >
            Export
          </Button>
          <Button
            startContent={<Plus size={18} />}
            as={Link}
            color="primary"
            to="/add"
          >
            Add New
          </Button>
        </div>
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
