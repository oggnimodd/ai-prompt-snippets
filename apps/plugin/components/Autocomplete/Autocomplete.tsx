import React, { useState } from "react";
import { useCombobox } from "downshift";
import clsx from "clsx";

const templates = [
  {
    label: "Translate To English",
    short: "tr",
    params: [
      {
        name: "source",
        type: "text",
      },
    ],
  },
  {
    label: "How to use this word",
    short: "w",
    params: [
      {
        name: "word",
        type: "text",
      },
    ],
  },
];

const getTemplatesFilter = (inputValue: string) => {
  const lowerCasedInputValue = inputValue.toLowerCase().trim();

  return function templatesFilter(template) {
    return (
      !inputValue ||
      `/${template.label}`.toLowerCase().includes(lowerCasedInputValue) ||
      `/${template.short}`.toLowerCase().includes(lowerCasedInputValue)
    );
  };
};

const Autocomplete = () => {
  const [items, setItems] = useState(templates);
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
    selectItem,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      if (inputValue) {
        setItems(templates.filter(getTemplatesFilter(inputValue)));
      }
    },
    items,
    itemToString(item) {
      return item ? `/${item.short}` : "";
    },
    onSelectedItemChange(changes) {
      console.log(changes.selectedItem);
    },
  });

  return (
    <div className="mt-64 relative">
      <div className="w-72 flex flex-col gap-1">
        <label className="w-fit" {...getLabelProps()}>
          Choose a command
        </label>
        <div className="flex shadow-sm bg-white gap-0.5">
          <textarea
            rows={1}
            placeholder="Command"
            className="w-full p-1.5"
            {...getInputProps()}
          />
          <button
            aria-label="clear selection"
            className="px-2"
            type="button"
            onClick={() => {
              selectItem(null);
            }}
            tabIndex={-1}
          >
            &#215;
          </button>
          <button
            aria-label="toggle menu"
            className="px-2"
            type="button"
            {...getToggleButtonProps()}
          >
            {isOpen ? <>&#8595;</> : <> &#8593;</>}
          </button>
        </div>
      </div>
      <ul
        className={`absolute w-72 bg-white mt-1 shadow-md max-h-40 overflow-y-auto p-0 bottom-full ${
          !(isOpen && items.length) && "hidden"
        }`}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              className={clsx(
                highlightedIndex === index && "bg-blue-300",
                selectedItem === item && "font-bold",
                "py-2 px-3 shadow-sm flex flex-col",
              )}
              key={`${item.short}${index}`}
              {...getItemProps({ item, index })}
            >
              <span>/{item.short}</span>
              <span className="text-sm text-gray-700">{item.label}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
