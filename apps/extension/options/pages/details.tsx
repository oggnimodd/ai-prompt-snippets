import { SnippetCreator } from "../components";
import { Button } from "@nextui-org/react";
import { Home } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useSnippets } from "../hooks";
import { LoadingWithMessage, PageMessage } from "@acme/ui";

const Add = () => {
  const { isLoading, snippets } = useSnippets();

  const { id } = useParams();

  const snippet = snippets.find((snippet) => snippet.id === id);

  if (isLoading) {
    return <LoadingWithMessage message="Getting All Your Snippets" />;
  }

  if (!snippet) {
    return <PageMessage title="Not Found" message="Snippet not found" />;
  }

  return (
    <div>
      {/* TODO : create a reusable layout for this kind of page */}

      <div className="mb-2 flex">
        <Button
          startContent={<Home size={16} />}
          className="ml-auto"
          color="primary"
          as={Link}
          to="/"
          isIconOnly
        />
      </div>

      <SnippetCreator snippet={snippet} />
    </div>
  );
};

export default Add;
