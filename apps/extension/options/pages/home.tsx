import { Button, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { SnippetList } from "../components";
import { Download, Plus, Upload } from "lucide-react";
import { LoadingWithMessage } from "@acme/ui";
import { useImportSnippets, useSearchSnippets, useSnippets } from "../hooks";
import { exportSnippets } from "../../export-import";
import { delay } from "utils/delay";

const Index = () => {
  const { isLoading, snippets, setSnippets, getSnippets, setIsLoading } =
    useSnippets();
  const { search, onSearchChange, clearSearch } = useSearchSnippets();
  const { chooseSnippetsFile } = useImportSnippets({
    onSuccess: async () => {
      setIsLoading(true);
      await delay(200);
      await getSnippets();
    },
    // TODO : use toast to display error
    onError: () => alert("Not a valid snippets file"),
  });

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
