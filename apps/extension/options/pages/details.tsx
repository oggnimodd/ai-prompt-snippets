import { SnippetCreator, SnippetCreatorWrapper } from "../components";
import { Link, useParams } from "react-router-dom";
import { useSnippets } from "../hooks";
import { LoadingWithMessage, PageMessage } from "@acme/ui";
import { Button } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";

const Add = () => {
  const { isLoading, snippets } = useSnippets();

  const { id } = useParams();

  const snippet = snippets.find((snippet) => snippet.id === id);

  if (isLoading) {
    return <LoadingWithMessage message="Getting All Your Snippets" />;
  }

  if (!snippet) {
    return (
      <PageMessage title="Not Found" message="Snippet not found">
        <Link to="/">
          <Button color="primary" startContent={<ArrowLeft size={16} />}>
            Back to Home
          </Button>
        </Link>
      </PageMessage>
    );
  }

  return (
    <SnippetCreatorWrapper snippet={snippet}>
      <SnippetCreator snippet={snippet} />
    </SnippetCreatorWrapper>
  );
};

export default Add;
