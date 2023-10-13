import { useEffect, useState } from "react";
import { getLocalStorageValue } from "utils/storage";
import type { Snippet } from "models/snippet";
import { Option } from "@ui/index";

const useSnippets = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [activeSnippet, setActiveSnippet] = useState<Option | null>(null);

  useEffect(() => {
    (async () => {
      const results = await getLocalStorageValue("snippets");
      if (results) {
        setSnippets(results);
      }
    })();
  }, []);

  const convertToOption = (snippet: Snippet): Option => {
    return {
      key: snippet.id,
      label: snippet.title,
    };
  };

  return {
    snippets,
    activeSnippet,
    setActiveSnippet,
    convertToOption,
  };
};

export default useSnippets;
