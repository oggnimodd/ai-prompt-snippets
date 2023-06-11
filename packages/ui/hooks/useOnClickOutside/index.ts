import type React from "react";
import { useEffect } from "react";

interface useOnClickOutsideProps {
  ref: React.MutableRefObject<HTMLElement | null>;
  handler: (event: MouseEvent | TouchEvent) => void;
}

export const useOnClickOutside = ({ ref, handler }: useOnClickOutsideProps) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};
