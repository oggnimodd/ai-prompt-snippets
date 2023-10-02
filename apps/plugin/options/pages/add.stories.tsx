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
import type { OptionsParam, Snippet } from "../../snippet/model";
import { snippetSchema } from "../../snippet/model";
import { nanoid } from "nanoid";
import { X as CloseIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea, Button, Select, SelectItem } from "@nextui-org/react";
import { Plus } from "lucide-react";
import React from "react";

interface OptionEditorProps {
  control: Control<Snippet, any>;
  parameterIndex: number;
}

const OptionEditor: React.FC<OptionEditorProps> = ({
  control,
  parameterIndex,
}) => {
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
    append({
      id: nanoid(),
      title: "",
    });
  };

  const errors = _errors as FieldErrors<{
    id: string;
    title: string;
    prompt: string;
    parameters?: OptionsParam[];
  }>;

  const rootError = errors.parameters?.[parameterIndex]?.options?.root?.message;

  return (
    <div className="flex flex-col">
      <span className="block text-small font-medium text-foreground will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none">
        Options
      </span>
      <div className="flex flex-col mb-2 gap-y-2">
        {options.length > 0 &&
          options.map((option, optionIndex) => {
            return (
              <div
                key={option.id}
                className="flex justify-between max-w-[50%] text-sm rounded-md items-center gap-x-4"
              >
                <Controller
                  control={control}
                  name={`parameters.${parameterIndex}.options.${optionIndex}`}
                  render={({ field }) => {
                    return (
                      <Input
                        errorMessage={
                          errors.parameters?.[parameterIndex]?.options?.[
                            optionIndex
                          ]?.title?.message
                        }
                        label={optionIndex + 1}
                        labelPlacement="outside-left"
                        placeholder="Enter the option name"
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
                  isIconOnly
                  onPress={() => remove(optionIndex)}
                  startContent={<CloseIcon size={18} />}
                />
              </div>
            );
          })}
      </div>

      {/* Display error if there is no options provided */}
      {rootError && <p className="text-tiny text-danger">{rootError}</p>}

      {options.length < 5 && (
        <div className="flex gap-x-4">
          <Button
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

const paramTypes = [
  {
    label: "String",
    value: "string",
  },
  {
    label: "Options",
    value: "options",
  },
];

type ParamType = "string" | "options";

const ParameterEditor: React.FC<ParameterEditorProps> = ({
  control,
  parameterIndex,
  remove,
}) => {
  const values = useWatch({
    name: "parameters",
    control,
  });
  const { errors } = useFormState({
    control,
  });

  const paramType = values?.[parameterIndex]?.type as ParamType;

  return (
    <div className="flex flex-col bg-zinc-200 rounded-sm px-5 py-2 gap-y-2">
      <Controller
        control={control}
        name={`parameters.${parameterIndex}.title`}
        render={({ field }) => {
          return (
            <Input
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
              selectedKeys={new Set([paramType])}
              placeholder="Select parameter type"
              label="Type"
              labelPlacement="outside"
              disableAnimation
              {...field}
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
        onPress={() => {
          remove(parameterIndex);
        }}
        color="danger"
        size="sm"
        className="self-end"
      >
        Delete
      </Button>
    </div>
  );
};

const ComplexForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Snippet>({
    resolver: zodResolver(snippetSchema),
    defaultValues: {
      title: "Book Summary",
      prompt: "Provide a detailed summary of the book [title] by [author]",
      id: nanoid(),
      parameters: [
        {
          title: "title",
          type: "string",
          id: nanoid(),
        },
        {
          title: "author",
          type: "string",
          id: nanoid(),
        },
        {
          title: "language",
          type: "options",
          id: nanoid(),
          options: [
            {
              id: nanoid(),
              title: "English",
            },
            {
              id: nanoid(),
              title: "French",
            },
          ],
        },
      ],
    },
  });

  const {
    fields: parameters,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "parameters",
  });

  const onSubmit = (data: Snippet) => {
    console.log(data);
  };

  return (
    <form className="flex flex-col gap-y-2" onSubmit={handleSubmit(onSubmit)}>
      <Input
        required
        placeholder="Enter snippet title"
        label="Title"
        labelPlacement="outside"
        errorMessage={errors?.title?.message}
        {...register("title")}
      />

      <Textarea
        required
        placeholder="Enter the prompt here"
        label="Prompt"
        labelPlacement="outside"
        errorMessage={errors?.prompt?.message}
        {...register("prompt")}
      />

      {parameters.length > 0 && (
        <div className="flex flex-col">
          <span className="block text-small font-medium text-foreground pb-1.5 will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none">
            Parameters
          </span>
          <div className="flex flex-col gap-y-4">
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
      {parameters.length < 5 && (
        <Button
          onPress={() =>
            append({
              type: "string",
              title: "new",
              id: nanoid(),
            })
          }
          startContent={<Plus size={16} />}
        >
          Add Param
        </Button>
      )}

      <Button className="self-end mt-4" color="primary" type="submit">
        Save
      </Button>
    </form>
  );
};

export const Test = () => {
  return (
    <div>
      <ComplexForm />
    </div>
  );
};
