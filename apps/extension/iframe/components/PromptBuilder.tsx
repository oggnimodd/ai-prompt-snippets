import useSnippets from "../hooks/useSnippets";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Combobox } from "@acme/ui";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Param } from "snippet/model";
import { PromptData, messageIframeParent } from "utils/message";
import { optionsUrl } from "utils/chrome";

type HandleParameterChange = (key: string, value: string) => void;

// TODO : refactor code and optimize the number of render

const ParameterEditor: React.FC<{
  parameter: Param;
  handleParameterChange: HandleParameterChange;
}> = ({ parameter, handleParameterChange }) => {
  // We use id as the value, so we don't need to worry if there are multiple options with the same name
  const [choosenOption, setChoosenOption] = useState(
    parameter.type === "options" ? parameter.options[0].id : "",
  );

  let optionValue: string;

  if (parameter.type === "options") {
    // Here we get the value that we want to use using the id
    optionValue = parameter.options.filter(
      (option) => option.id === choosenOption,
    )[0].title;
  }

  useEffect(() => {
    if (parameter.type === "options") {
      handleParameterChange(parameter.title, optionValue);
    }
  }, []);

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
        label={parameter.title}
        labelPlacement="outside"
        disableAnimation
        onChange={(e) => {
          const value = e.target.value;

          if (value) {
            setChoosenOption(value);
            handleParameterChange(
              parameter.title,
              parameter.options.filter((option) => option.id === value)[0]
                .title,
            );
          }
        }}
      >
        {parameter.options.map((option) => {
          return (
            <SelectItem key={option.id} value={option.id}>
              {option.title}
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
    return (
      <span>
        No snippets, you can add new ones{" "}
        <a
          className="text-primary-500 underline"
          href={optionsUrl}
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
      </span>
    );
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

    console.log(finalPrompt);

    // Since this is an iframe , send the message to the parent window
    messageIframeParent<PromptData>({
      type: "ENTER_PROMPT",
      message: {
        prompt: finalPrompt,
      },
    });
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
          <div className="my-6 flex flex-col">
            <span className="block text-small font-medium pointer-events-none text-foreground pb-1 transition-none">
              Prompt Snippet
            </span>
            <p className="line-clamp-3 opacity-80 text-sm ">{snippet.prompt}</p>
          </div>

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
