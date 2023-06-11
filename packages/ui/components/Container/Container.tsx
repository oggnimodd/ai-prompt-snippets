import clsx from "clsx";
import React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <div
      className={clsx("mx-auto w-full max-w-screen-md px-4 lg:px-5", className)}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default Container;
