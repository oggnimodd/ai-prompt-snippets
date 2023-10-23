import { Button, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { SnippetList } from "../components";
import { Download, Plus, Upload, Moon, Sun, Trash2 } from "lucide-react";
import { LoadingWithMessage, Toast } from "@acme/ui";
import { useImportSnippets, useSearchSnippets, useSnippets } from "../hooks";
import { useTheme } from "shared/hooks";
import { exportSnippets } from "../../export-import";
import { delay } from "utils/delay";
import { toast } from "react-hot-toast";

const Index = () => {
  const {
    isLoading,
    snippets,
    setSnippets,
    getSnippets,
    setIsLoading,
    deleteAllSnippets,
  } = useSnippets();
  const { search, onSearchChange, clearSearch } = useSearchSnippets();
  const { chooseSnippetsFile } = useImportSnippets({
    onSuccess: async () => {
      setIsLoading(true);
      await delay(200);
      await getSnippets();
      toast.custom((t) => {
        return (
          <Toast
            isClosable
            onClose={() => toast.remove(t.id)}
            variant="success"
            description="Snippets successfully imported"
          />
        );
      });
    },
    onError: () =>
      toast.custom((t) => {
        return (
          <Toast
            isClosable
            onClose={() => toast.remove(t.id)}
            variant="error"
            description="Not a valid snippets file"
          />
        );
      }),
  });
  const { toggleTheme, theme } = useTheme();

  if (isLoading) {
    return <LoadingWithMessage message="Getting All Your Snippets" />;
  }

  return (
    <>
      <div className="flex flex-wrap justify-between gap-x-4 gap-y-2 items-end mb-8">
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
            data-cy="toggle-theme-button"
            onPress={toggleTheme}
            startContent={
              theme === "dark" ? <Moon size={18} /> : <Sun size={18} />
            }
            color="primary"
          >
            {theme === "dark" ? "Dark" : "Light"}
          </Button>
          <Button
            data-cy="delete-all-snippets-button"
            onPress={deleteAllSnippets}
            startContent={<Trash2 size={18} />}
            color="primary"
          >
            Clear
          </Button>
          <Button
            data-cy="import-snippet-button"
            onPress={chooseSnippetsFile}
            startContent={<Download size={18} />}
            color="primary"
          >
            Import
          </Button>
          <Button
            data-cy="export-snippet-button"
            onPress={() => exportSnippets()}
            startContent={<Upload size={18} />}
            color="primary"
          >
            Export
          </Button>
          <Button
            data-cy="add-snippet-button"
            startContent={<Plus size={18} />}
            as={Link}
            color="primary"
            to="/add"
          >
            Add
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
