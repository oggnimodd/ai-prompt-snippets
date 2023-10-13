import { useEffect, useState } from "react";
import { getLocalStorageValue } from "utils/storage";
import { Snippet } from "models/snippet";

const useSnippets = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Todo : use useContext or any state manager library to prevent prop drilling
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  const getSnippets = async () => {
    try {
      const results = await getLocalStorageValue("snippets");
      if (results) {
        setSnippets(results);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSnippets();
  }, []);

  return { isLoading, setIsLoading, snippets, setSnippets, getSnippets };
};

export default useSnippets;
