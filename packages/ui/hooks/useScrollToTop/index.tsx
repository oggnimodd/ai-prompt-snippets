import { useEffect } from "react";

export const useScrollToTop = () => {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);
};
