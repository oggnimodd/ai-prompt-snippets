import { SnippetCreator, SnippetCreatorWrapper } from "../components";
import { useParams } from "react-router-dom";
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
    <SnippetCreatorWrapper>
      <SnippetCreator snippet={snippet} />
    </SnippetCreatorWrapper>
  );
};

export default Add;
