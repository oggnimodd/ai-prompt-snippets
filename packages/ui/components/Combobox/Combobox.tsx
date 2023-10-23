import React, { InputHTMLAttributes, useRef } from "react";
import { Combobox as HeadlessCombobox } from "@headlessui/react";
import { useState } from "react";
import { input as inputTv } from "@nextui-org/react";
import { cn } from "@ui/utils/cn";
import { ArrowDown, X as ClearIcon } from "lucide-react";

const { inputWrapper: inputWrapperClassNames, input: inputClassNames } =
  inputTv();

export type Option = {
  key: string;
  label: string;
};

interface ComboboxProps extends InputHTMLAttributes<HTMLInputElement> {
  options: Option[];
  selected: Option | null;
  setSelected: (selected: Option) => void;
}

const Combobox: React.FC<ComboboxProps> = ({
  selected,
  options,
  setSelected,
  className,
  placeholder,
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filteredItems =
    query === ""
      ? options
      : options.filter((item) =>
          item.label
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <div className={cn("relative w-full items-center", className)}>
      <HeadlessCombobox value={selected} onChange={setSelected}>
        {/* Input Field */}
        <div className={inputWrapperClassNames({})}>
          <HeadlessCombobox.Input
            placeholder={placeholder}
            autoComplete="off"
            displayValue={(item) => (item as Option)?.label || ""}
            onChange={(event) => setQuery(event.target.value)}
            className={cn(inputClassNames({}), "pr-12")}
            data-cy="combobox-input"
            ref={inputRef}
          />
        </div>

        {/* Buttons */}
        <div className="h-6 absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-x-1">
          <button
            data-cy="combobox-clear-button"
            onClick={(e) => {
              e.preventDefault();
              if (inputRef?.current) {
                inputRef.current.value = "";
                setQuery("");
                inputRef.current.focus();
              }
            }}
            className="h-full text-lg hover:text-primary"
          >
            <ClearIcon size={20} />
          </button>
          <HeadlessCombobox.Button
            className="h-full text-lg hover:text-primary"
            data-cy="combobox-open-button"
          >
            <ArrowDown size={20} />
          </HeadlessCombobox.Button>
        </div>

        {/* Options */}
        <HeadlessCombobox.Options
          data-cy="combobox-options"
          className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-lg bg-default-100"
        >
          {/* If there is no results */}
          {filteredItems.length === 0 && query !== "" ? (
            <div
              data-cy="combobox-no-results"
              className="relative cursor-default select-none py-2 px-4 text-default-700"
            >
              Nothing found.
            </div>
          ) : (
            // Else, render options
            filteredItems
              .sort((a, b) => a.label.localeCompare(b.label))
              .map((item) => (
                <HeadlessCombobox.Option
                  data-cy="combobox-option"
                  key={item.key}
                  value={item}
                  className={({ active, selected }) =>
                    cn(
                      "relative cursor-default select-none py-2 pl-3 pr-9 capitalize text-black hover:bg-primary-200 hover:bg-primary-200 dark:text-default-500 dark:hover:bg-primary-400 dark:hover:text-white",
                      selected &&
                        "bg-primary-300 dark:bg-primary-500 dark:text-white",
                      active &&
                        "bg-primary-200 dark:bg-primary-400 dark:text-white",
                    )
                  }
                >
                  {item.label}
                </HeadlessCombobox.Option>
              ))
          )}
        </HeadlessCombobox.Options>
      </HeadlessCombobox>
    </div>
  );
};

export default Combobox;
