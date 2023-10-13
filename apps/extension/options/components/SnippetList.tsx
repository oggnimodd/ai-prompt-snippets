import { FC } from "react";
import { SnippetCard } from ".";
import type { Snippet } from "models/snippet";
import { PageMessage } from "@acme/ui";

const SnippetList: FC<{
  snippets: Snippet[];
  search: string;
  setSnippets: React.Dispatch<React.SetStateAction<Snippet[]>>;
}> = ({ search, snippets, setSnippets }) => {
  const filteredItems = snippets.filter(
    (item) =>
      item.title.trim().toLowerCase().indexOf(search.toLowerCase().trim()) !==
      -1,
  );

  if (filteredItems.length === 0) {
    return <PageMessage title="not found" message="No Snippets Found" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredItems.length > 0 &&
        filteredItems.map((snippet) => {
          return (
            <SnippetCard
              setSnippets={setSnippets}
              key={snippet.id}
              snippet={snippet}
            />
          );
        })}
    </div>
  );
};

export default SnippetList;
