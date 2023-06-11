import React from "react";
import { Container } from "../Container";
import clsx from "clsx";

interface HeaderContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}
const HeaderContainer: React.FC<HeaderContainerProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <header
      className={clsx(
        "fixed top-0 right-0 left-0 z-50 flex h-16 w-full border-b border-background-200 border-black/10 bg-white dark:bg-background-400",
        className,
      )}
      {...rest}
    >
      <Container className="h-full">{children}</Container>
    </header>
  );
};

export default HeaderContainer;
