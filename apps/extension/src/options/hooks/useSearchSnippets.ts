import { useState } from "react";

// Search snippet using query
const useSearchSnippet = () => {
  const [search, setSearch] = useState("");

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
  };

  const clearSearch = () => {
    setSearch("");
  };

  return { search, onSearchChange, clearSearch };
};

export default useSearchSnippet;
