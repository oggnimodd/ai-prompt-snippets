import React, { useEffect, useRef } from "react";

import {
  Control,
  Controller,
  FieldErrors,
  UseFieldArrayRemove,
  useFieldArray,
  useForm,
  useFormState,
  useWatch,
} from "react-hook-form";
import type { OptionsParam, Snippet, StringParam } from "models/snippet";
import { snippetSchema } from "models/snippet";
import { nanoid } from "nanoid";
import { X as CloseIcon, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea, Button, Select, SelectItem } from "@nextui-org/react";
import { Plus } from "lucide-react";
import {
  getLocalStorageValue,
  setOrUpdateLocalStorageValue,
} from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import { useIsFirstRender } from "shared/hooks";

const ALLOWED_OPTIONS_NUMBER = 20;
const ALLOWED_PARAMETERS_NUMBER = 15;

interface OptionEditorProps {
  control: Control<Snippet, any>;
  parameterIndex: number;
}

const OptionEditor: React.FC<OptionEditorProps> = ({
  control,
  parameterIndex,
}) => {
  const isFirstRender = useIsFirstRender();
  const optionsWrapperRef = useRef<HTMLDivElement | null>(null);

  const {
    fields: options,
    remove,
    append,
  } = useFieldArray({
    control,
    name: `parameters.${parameterIndex}.options`,
  });

  const { errors: _errors } = useFormState({
    control,
  });

  const addNewOption = () => {
    if (options.length < ALLOWED_OPTIONS_NUMBER) {
      append({
        id: nanoid(),
        title: "",
      });
    }
  };

  useEffect(() => {
    const lastInput = optionsWrapperRef.current
      ?.querySelector("div:has(button):last-child")
      ?.querySelector("input") as HTMLInputElement | undefined;

    // Here checking the isFirstRender will prevent focusing when opening the page
    if (lastInput && !isFirstRender) {
      lastInput.focus();
    }
  }, [options.length]);

  const errors = _errors as FieldErrors<{
    id: string;
    title: string;
    prompt: string;
    parameters?: OptionsParam[];
  }>;

  const rootError = errors.parameters?.[parameterIndex]?.options?.root?.message;
  const optionsError = errors.parameters?.[parameterIndex]?.options?.message;

  return (
    <div className="flex flex-col">
      <span className="block text-small font-medium text-foreground will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none">
        Options
      </span>
      <div className="flex flex-col mb-2 gap-y-2" ref={optionsWrapperRef}>
        {options.length > 0 &&
          options.map((option, optionIndex) => {
            return (
              <div
                data-cy="snippet-option-item"
                key={option.id}
                className="flex justify-between max-w-[50%] text-sm rounded-md items-center gap-x-4"
              >
                <Controller
                  control={control}
                  name={`parameters.${parameterIndex}.options.${optionIndex}`}
                  render={({ field }) => {
                    return (
                      <Input
                        data-cy="snippet-option-item-title-input"
                        errorMessage={
                          errors.parameters?.[parameterIndex]?.options?.[
                            optionIndex
                          ]?.title?.message
                        }
                        label={optionIndex + 1}
                        labelPlacement="outside-left"
                        placeholder="Enter option"
                        {...field}
                        value={field.value.title}
                        required
                        onKeyDown={(e) => {
                          // Prevent submitting the form when pressing enter
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addNewOption();
                          }
                        }}
                        onChange={(e) => {
                          field.onChange({
                            id: field.value.id,
                            title: e.target.value,
                          });
                        }}
                      />
                    );
                  }}
                />
                <Button
                  data-cy="snippet-param-delete-option-button"
                  isIconOnly
                  onPress={() => remove(optionIndex)}
                  startContent={<CloseIcon size={18} />}
                />
              </div>
            );
          })}
      </div>

      {/* Display error if there is no options provided */}
      {(rootError || optionsError) && (
        <p className="text-tiny text-danger mb-2">
          {rootError || optionsError}
        </p>
      )}

      {options.length < ALLOWED_OPTIONS_NUMBER && (
        <div className="flex gap-x-4 className max-w-[50%]">
          <Button
            data-cy="snippet-param-add-option-button"
            className="ml-auto"
            fullWidth
            variant="bordered"
            color="primary"
            size="sm"
            onPress={() => addNewOption()}
            startContent={<Plus size={18} />}
          >
            Add New Option
          </Button>
        </div>
      )}
    </div>
  );
};

interface ParameterEditorProps {
  parameterIndex: number;
  control: Control<Snippet, any>;
  remove: UseFieldArrayRemove;
}

type SelectParamTypes = {
  label: string;
  value: StringParam["type"] | OptionsParam["type"];
}[];

const paramTypes: SelectParamTypes = [
  {
    label: "Text",
    value: "text",
  },
  {
    label: "Options",
    value: "options",
  },
];

const ParameterEditor: React.FC<ParameterEditorProps> = ({
  control,
  parameterIndex,
  remove,
}) => {
  const paramType = useWatch({
    name: `parameters.${parameterIndex}.type`,
    control,
  });

  const { errors } = useFormState({
    control,
  });

  return (
    <div className="flex flex-col py-5 gap-y-2 bg-default-200 bg-opacity-80 dark:bg-default-300 dark:bg-opacity-[15%] rounded-xl px-4">
      <Controller
        control={control}
        name={`parameters.${parameterIndex}.title`}
        render={({ field }) => {
          return (
            <Input
              data-cy="snippet-param-name-input"
              placeholder="Enter the parameter name"
              label="Name"
              labelPlacement="outside"
              errorMessage={
                errors?.parameters?.[parameterIndex]?.title?.message
              }
              required
              {...field}
            />
          );
        }}
      />

      <Controller
        control={control}
        name={`parameters.${parameterIndex}.type`}
        render={({ field }) => {
          return (
            <Select
              data-cy="snippet-param-type-input"
              selectedKeys={new Set([paramType])}
              placeholder="Select parameter type"
              label="Type"
              labelPlacement="outside"
              disableAnimation
              {...field}
              onChange={(e) => {
                const newValue = e.target.value;
                if (newValue) {
                  field.onChange(newValue);
                }
              }}
            >
              {paramTypes.map((paramType) => {
                return (
                  <SelectItem key={paramType.value} value={paramType.value}>
                    {paramType.label}
                  </SelectItem>
                );
              })}
            </Select>
          );
        }}
      />

      {paramType === "options" && (
        <OptionEditor {...{ control, parameterIndex }} />
      )}

      <Button
        startContent={<CloseIcon size={14} />}
        onPress={() => {
          remove(parameterIndex);
        }}
        color="danger"
        size="sm"
        className="self-end"
        data-cy="snippet-delete-param-button"
      >
        Delete
      </Button>
    </div>
  );
};

export interface SnippetCreatorProps {
  snippet?: Snippet;
}

const SnippetCreator: React.FC<SnippetCreatorProps> = ({
  snippet = {
    id: nanoid(),
    title: "",
    prompt: "",
    parameters: [],
  } satisfies Snippet,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Snippet>({
    resolver: zodResolver(snippetSchema),
    defaultValues: snippet,
  });

  const {
    fields: parameters,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "parameters",
  });

  const navigate = useNavigate();

  const onSubmit = async (data: Snippet) => {
    try {
      const snippets = (await getLocalStorageValue("snippets")) as
        | Snippet[]
        | undefined;

      if (!snippets) {
        await setOrUpdateLocalStorageValue("snippets", [data]);
      } else {
        // Check if snippet already exists
        const snippetExists = snippets.find(
          (snippet) => snippet.id === data.id,
        );
        if (snippetExists) {
          const index = snippets.findIndex((snippet) => snippet.id === data.id);
          snippets.splice(index, 1, data);

          await setOrUpdateLocalStorageValue("snippets", snippets);
        } else {
          // Merge snippets
          await setOrUpdateLocalStorageValue("snippets", [...snippets, data]);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/");
    }
  };

  return (
    <form
      data-cy="snippet-form"
      className="flex flex-col gap-y-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        data-cy="snippet-title-input"
        required
        placeholder="Enter snippet title"
        label="Title"
        labelPlacement="outside"
        errorMessage={errors?.title?.message}
        {...register("title")}
        classNames={{ label: "text-primary-500 font-bold" }}
      />

      <Textarea
        data-cy="snippet-prompt-input"
        required
        placeholder="Enter the prompt here"
        label="Prompt"
        labelPlacement="outside"
        errorMessage={errors?.prompt?.message}
        {...register("prompt")}
        classNames={{ label: "text-primary-500 font-bold" }}
      />

      {parameters.length > 0 && (
        <div className="flex flex-col">
          <span className="block text-small text-foreground pb-1.5 will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none text-primary-500 font-bold">
            Parameters
          </span>
          <div
            className="flex flex-col gap-y-4"
            data-cy="snippet-params-container"
          >
            {parameters.map((param, parameterIndex) => {
              return (
                <ParameterEditor
                  key={param.id}
                  {...{ control, parameterIndex, remove }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* For now let just set the max number of params to 5*/}
      {parameters.length < ALLOWED_PARAMETERS_NUMBER && (
        <Button
          data-cy="snippet-add-param-button"
          color="primary"
          onPress={() =>
            append({
              type: "text",
              title: "new",
              id: nanoid(),
            })
          }
          startContent={<Plus size={16} />}
        >
          Add Param
        </Button>
      )}

      <Button
        startContent={<Save size={16} />}
        className="self-end mt-4"
        color="primary"
        type="submit"
        data-cy="snippet-form-submit-button"
      >
        Save
      </Button>
    </form>
  );
};

export default SnippetCreator;
