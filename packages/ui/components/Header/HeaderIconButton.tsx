import clsx from "clsx";
import React, { forwardRef } from "react";
import { createPolymorphicComponent } from "../../utils/create-polymorphic-component";

export interface HeaderIconButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

const _HeaderIconButton = forwardRef<
  HTMLButtonElement,
  HeaderIconButtonProps & { component: any }
>((props, ref) => {
  const { icon, component, className, ...restProps } = props;

  const Element = component || "button";

  return (
    <Element
      ref={ref}
      className={clsx(
        "flex h-10 w-10 items-center justify-center rounded-full text-2xl text-primary-500 hover:bg-primary-200/60 dark:hover:bg-background-200",
        className,
      )}
      {...restProps}
    >
      {icon}
    </Element>
  );
});

export default createPolymorphicComponent<"button", HeaderIconButtonProps>(
  _HeaderIconButton,
);
