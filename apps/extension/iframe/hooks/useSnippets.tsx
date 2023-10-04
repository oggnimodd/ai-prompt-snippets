import { useEffect, useState } from "react";
import { getLocalStorageValue } from "utils/storage";
import type { Snippet } from "snippet/model";

const useSnippets = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [activeSnippet, setActiveSnippet] = useState<Snippet["id"] | null>(
    null,
  );

  useEffect(() => {
    (async () => {
      const results = await getLocalStorageValue("snippets");
      if (results) {
        setSnippets(results);
      }
    })();
  }, []);

  return {
    snippets,
    activeSnippet,
    setActiveSnippet,
  };
};

export default useSnippets;
