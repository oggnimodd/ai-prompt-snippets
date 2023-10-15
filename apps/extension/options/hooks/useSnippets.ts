import { useEffect, useState } from "react";
import {
  getLocalStorageValue,
  setOrUpdateLocalStorageValue,
} from "utils/storage";
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

  const deleteAllSnippets = async () => {
    await setOrUpdateLocalStorageValue("snippets", []);
    await getSnippets();
  };

  useEffect(() => {
    getSnippets();
  }, []);

  return {
    isLoading,
    setIsLoading,
    snippets,
    setSnippets,
    getSnippets,
    deleteAllSnippets,
  };
};

export default useSnippets;
