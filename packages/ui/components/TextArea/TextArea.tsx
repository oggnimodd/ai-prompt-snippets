import React from "react";
import { useTextField } from "@react-aria/textfield";
import type { AriaTextFieldProps } from "@react-aria/textfield";
import clsx from "clsx";
import { useObjectRef } from "@react-aria/utils";

type TextAreaProps = AriaTextFieldProps & {
  label?: string;
  className?: string;
};

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, className, ...props }, ref) => {
    const inputRef = useObjectRef(ref);

    const { labelProps, inputProps } = useTextField(
      {
        ...props,
        inputElementType: "textarea",
      },
      inputRef,
    );

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

        <textarea
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

export default TextArea;
