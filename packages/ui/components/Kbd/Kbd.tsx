import React from "react";

export interface KbdProps {
  children: string;
}

const Kbd: React.FC<KbdProps> = ({ children, ...restProps }) => {
  return (
    <kbd
      className="rounded-md bg-primary-200/60 px-2 py-[2px] font-mono text-xs font-semibold dark:bg-background-200"
      {...restProps}
    >
      {children}
    </kbd>
  );
};

export default Kbd;
