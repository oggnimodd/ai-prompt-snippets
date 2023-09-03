import { FC } from "react";
import { SnippetCard } from ".";
import type { Snippet } from "../../snippet/model";
import { PageMessage } from "@acme/ui";

const SnippetList: FC<{ snippets: Snippet[]; search: string }> = ({
  search,
  snippets,
}) => {
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
        filteredItems.map((item) => {
          return (
            <SnippetCard
              title={item.title}
              key={item.title}
              prompt={item.prompt}
            />
          );
        })}
    </div>
  );
};

export default SnippetList;
