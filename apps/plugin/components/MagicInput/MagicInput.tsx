import React, { useState } from "react";

const template = [
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

const Textarea = ({ value, setValue }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="px-2 py-2 w-full"
    />
  );
};

const Suggestions = ({ value, setTemplate }) => {
  return (
    <div className="absolute bottom-full">
      <ul>
        {template.map((item) => {
          if (item.label.includes(value)) {
            return (
              // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
              <li
                onClick={() => {
                  setTemplate(item);
                }}
              >
                {item.label}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

const MagicInput = () => {
  const [template, setTemplate] = useState<string | null>(null);
  const [findingTemplate, setFindingTemplate] = useState(true);
  const [value, setValue] = useState("");

  return (
    <div className="mt-20">
      <div className="relative">
        {findingTemplate && (
          <div>
            <Suggestions value={value} setTemplate={setTemplate} />
            <Textarea value={value} setValue={setValue} />
          </div>
        )}
        <div />
      </div>
    </div>
  );
};

export default MagicInput;
