import React from "react";
import clsx from "clsx";

export interface EmptyStateProps {
  className?: string;
  children: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ className, children }) => {
  return (
    <div
      data-cy="empty-state"
      className={clsx(
        "flex h-40 w-full flex-col items-center justify-center gap-y-3 rounded-xl bg-primary-200/40 p-5 text-center dark:bg-background-300",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default EmptyState;
