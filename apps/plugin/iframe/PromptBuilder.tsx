import useSnippets from "./hooks/useSnippets";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Button, Combobox } from "@acme/ui";
import React, { useState } from "react";
import { Param } from "../snippet/model";

type HandleParameterChange = (key: string, value: string) => void;

const ParameterEditor: React.FC<{
  parameter: Param;
  handleParameterChange: HandleParameterChange;
}> = ({ parameter, handleParameterChange }) => {
  const [choosenOption, setChoosenOption] = useState(
    parameter.type === "options" ? parameter.options[0] : "",
  );

  if (parameter.type === "string") {
    return (
      <Input
        onChange={(e) => handleParameterChange(parameter.title, e.target.value)}
        label={parameter.title}
        labelPlacement="outside"
        placeholder={parameter.title}
      />
    );
  }

  if (parameter.type === "options") {
    return (
      <Select
        selectedKeys={new Set([choosenOption])}
        placeholder="Select parameter type"
        label="Type"
        labelPlacement="outside"
        disableAnimation
        onChange={(e) => {
          const value = e.target.value;

          setChoosenOption(value);
          handleParameterChange(parameter.title, value);
        }}
      >
        {parameter.options.map((option) => {
          return (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          );
        })}
      </Select>
    );
  }

  return null;
};

const replaceKeywords = (
  target: string,
  dict: Record<string, string>,
): string => {
  let replacedTarget = target;

  for (const key in dict) {
    // biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
    if (dict.hasOwnProperty(key)) {
      const regex = new RegExp(`\\[${key}\\]`, "g");
      replacedTarget = replacedTarget.replace(regex, dict[key]);
    }
  }

  return replacedTarget;
};

const PromptBuilder = () => {
  const { snippets, activeSnippet, setActiveSnippet } = useSnippets();
  // Create a state tracker for snippet parameters
  const [choosenParameters, setChoosenParameters] = useState<{
    [key: string]: string;
  }>({});

  if (snippets.length === 0) {
    return <span>No snippets, you can add new ones here</span>;
  }

  const snippet = snippets.find((i) => i.title === activeSnippet);

  const handleParameterChange: HandleParameterChange = (key, value) => {
    setChoosenParameters((prev) => {
      const newParams = { ...prev };

      newParams[key] = value;
      return newParams;
    });
  };

  // Create submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalPrompt = replaceKeywords(
      snippet?.prompt || "",
      choosenParameters,
    );

    // Since this is an iframe , send the message to the parent window
    window.parent.postMessage(finalPrompt, "*");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Combobox
        setChosenValue={(e: string | null) => {
          setActiveSnippet(e || activeSnippet);
          setChoosenParameters({});
        }}
        options={snippets.map((i) => i.title)}
        chosenValue={activeSnippet}
      />

      {activeSnippet && snippet && (
        <>
          <p className="line-clamp-3 opacity-80 text-sm mt-2">
            {snippet.prompt}
          </p>

          <div className="flex flex-col gap-2 mt-3">
            {snippet.parameters?.map((parameter) => {
              return (
                <ParameterEditor
                  handleParameterChange={handleParameterChange}
                  parameter={parameter}
                  key={parameter.id}
                />
              );
            })}
          </div>

          <Button className="mt-3" type="submit" color="primary">
            Send
          </Button>
        </>
      )}
    </form>
  );
};

export default PromptBuilder;
