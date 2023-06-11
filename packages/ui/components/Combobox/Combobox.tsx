import React from "react";
import { Combobox as HeadlessCombobox } from "@headlessui/react";
import type { Props } from "@headlessui/react/dist/types";
import { useState } from "react";
import { AiOutlineArrowDown, AiOutlineClose } from "react-icons/ai";
import clsx from "clsx";

interface ComboboxProps extends Props<"input"> {
  options: string[];
  chosenValue: string | null;
  setChosenValue: (q: string | null) => void;
}

const Combobox: React.FC<ComboboxProps> = ({
  chosenValue,
  options,
  setChosenValue,
  className,
  ...rest
}) => {
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? options ?? []
      : options?.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        }) ?? [];

  return (
    <div className={clsx("relative w-full", className)}>
      <HeadlessCombobox value={chosenValue} onChange={setChosenValue} nullable>
        <HeadlessCombobox.Input
          className="dark:primary-400/20 relative w-full rounded-md border border-slate-500 bg-transparent px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          onChange={(event) => setQuery(event.target.value)}
          {...rest}
          data-cy="combobox-input"
        />
        <div className="absolute right-2 top-1/2 flex w-fit -translate-y-1/2 transform flex-row space-x-2 text-xs">
          <HeadlessCombobox.Button
            className="h-4 w-4 text-lg hover:text-primary"
            data-cy="combobox-open-button"
          >
            <AiOutlineArrowDown />
          </HeadlessCombobox.Button>
          <button
            data-cy="combobox-clear-button"
            className="h-4 w-4 text-lg hover:text-primary"
            type="button"
            onClick={() => setChosenValue(null)}
          >
            <AiOutlineClose />
          </button>
        </div>
        <HeadlessCombobox.Options
          data-cy="combobox-options"
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-background-300 sm:text-sm"
        >
          {/* If there is no results */}
          {filteredItems.length === 0 && query !== "" ? (
            <div
              data-cy="combobox-no-results"
              className="relative cursor-default select-none py-2 px-4"
            >
              Nothing found.
            </div>
          ) : (
            // Else, render options
            filteredItems
              .sort((a, b) => a.localeCompare(b))
              .map((item) => (
                <HeadlessCombobox.Option
                  data-cy="combobox-option"
                  key={item}
                  value={item}
                  className={({ active, selected }) =>
                    clsx(
                      "relative cursor-default select-none py-2 pl-3 pr-9 capitalize text-gray-900 hover:bg-primary-200 hover:bg-primary-200 dark:text-white dark:hover:bg-primary-400 dark:hover:text-black",
                      selected && "bg-primary-300 dark:bg-primary-500",
                      active && "bg-primary-200 dark:bg-primary-400",
                    )
                  }
                >
                  {item}
                </HeadlessCombobox.Option>
              ))
          )}
        </HeadlessCombobox.Options>
      </HeadlessCombobox>
    </div>
  );
};

export default Combobox;
