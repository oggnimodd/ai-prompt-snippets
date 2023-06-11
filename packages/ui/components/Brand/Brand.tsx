import clsx from "clsx";
import React from "react";

export interface BrandProps extends React.HTMLAttributes<HTMLSpanElement> {
  title?: string;
}

const Brand: React.FC<BrandProps> = ({
  title = "RepoExplorer",
  className,
  ...restProps
}) => {
  return (
    <span
      className={clsx(
        "inline-block text-2xl font-bold text-primary-500",
        className,
      )}
      {...restProps}
    >
      {title}
    </span>
  );
};

export default Brand;
