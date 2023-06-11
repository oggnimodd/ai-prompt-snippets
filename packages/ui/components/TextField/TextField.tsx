import React from "react";
import { useTextField } from "@react-aria/textfield";
import type { AriaTextFieldProps } from "@react-aria/textfield";
import { useObjectRef } from "@react-aria/utils";
import clsx from "clsx";

type TextFieldProps = AriaTextFieldProps & {
  label?: string;
  className?: string;
};

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, className, ...props }, ref) => {
    const inputRef = useObjectRef(ref);

    const { labelProps, inputProps } = useTextField(props, inputRef);

    return (
      <div className="flex flex-col">
        {label && (
          <label
            {...labelProps}
            className={clsx(
              "mb-2 font-medium text-primary-500",
              labelProps.className,
            )}
          >
            {label}
          </label>
        )}

        <input
          {...inputProps}
          ref={inputRef}
          className={clsx(
            "dark:primary-400/20 rounded-md border border-slate-500 bg-transparent px-3 py-2",
            "focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500",
            className,
          )}
        />
      </div>
    );
  },
);

export default TextField;
