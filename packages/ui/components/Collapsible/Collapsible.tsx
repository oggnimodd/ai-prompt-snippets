import React from "react";
import { Disclosure } from "@headlessui/react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const iconCva = cva("flex w-10 justify-end", {
  variants: {
    iconSize: {
      sm: "text-lg",
      md: "text-xl",
      lg: "text-2xl",
      xl: "text-3xl",
    },
  },
  defaultVariants: {
    iconSize: "md",
  },
});

export interface CollapsibleProps extends VariantProps<typeof iconCva> {
  children: React.ReactNode;
  header: React.ReactNode;
  hideIcon?: boolean;
  buttonClassName?: string;
  panelClassName?: string;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  children,
  header,
  hideIcon,
  iconSize,
  buttonClassName,
  panelClassName,
}) => {
  return (
    <Disclosure>
      {({ open }) => (
        <div className="flex w-full flex-col" data-cy="collapsible-container">
          <Disclosure.Button
            data-cy="collapsible-button"
            className={clsx(
              "flex items-center justify-between",
              buttonClassName,
            )}
          >
            <div data-cy="collapsible-header" className="justify-between">
              {header}
            </div>
            {!hideIcon && (
              <span
                data-cy="collapsible-icon"
                className={iconCva({ iconSize })}
              >
                {open ? <AiFillCaretUp /> : <AiFillCaretDown />}
              </span>
            )}
          </Disclosure.Button>
          <Disclosure.Panel
            data-cy="collapsible-panel"
            className={panelClassName}
          >
            {children}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default Collapsible;
