import { useForm } from "react-hook-form";
import { Input, Button, Textarea, Select, SelectItem } from "@nextui-org/react";
import { Plus, Home } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import { X as CloseIcon } from "lucide-react";
import {
  Param,
  OptionsParam,
  Snippet,
  snippetSchema,
} from "../../snippet/model";
import { Link } from "react-router-dom";

type Option = {
  label: string;
  optionId: string;
};

interface OptionCardProps extends Option {
  deleteOption: (value: string) => void;
}

const handleSelectionChange = (
  e: React.ChangeEvent<HTMLSelectElement>,
  setter: (value: string) => void,
) => {
  const newValue = e.target.value;
  newValue && setter(newValue);
};

const OptionCard: React.FC<OptionCardProps> = ({
  label,
  optionId,
  deleteOption,
}) => {
  return (
    <div className="flex justify-between max-w-[50%] text-sm bg-zinc-300 py-1 px-3 rounded-md items-center">
      <span>{label}</span>
      <Button
        isIconOnly
        onPress={() => deleteOption(optionId)}
        startContent={<CloseIcon size={18} />}
      />
    </div>
  );
};

const OptionsEditor: React.FC<{
  handleParamChange: HandleParamChange;
}> = ({ handleParamChange }) => {
  const [options, setOptions] = useState<Option[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    handleParamChange(
      "options",
      options.map((i) => i.label),
    );
  }, [options]);

  const addOption = () => {
    const newValue = inputRef.current?.value;

    if (newValue && options.map((i) => i.label).indexOf(newValue) === -1) {
      const newOption: Option = {
        label: newValue,
        optionId: nanoid(),
      };
      newOption && setOptions([...options, newOption]);

      inputRef.current.value = "";
    }
  };

  // create delete option, use optionId to do that
  const deleteOption = (optionId: string) => {
    setOptions(options.filter((option) => option.optionId !== optionId));
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      addOption();
    }
  };

  return (
    <div className="flex flex-col">
      <span className="block text-small font-medium text-foreground will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none">
        Options
      </span>
      <div className="flex flex-col mb-2 gap-y-2">
        {options.length > 0 &&
          options.map((option) => {
            return (
              <OptionCard
                deleteOption={deleteOption}
                key={option.optionId}
                {...option}
              />
            );
          })}
      </div>

      {options.length < 5 && (
        <div className="flex gap-x-4">
          <Input
            onKeyDown={handleEnter}
            ref={inputRef}
            placeholder="Add new option"
            labelPlacement="outside"
          />

          <Button onPress={addOption} startContent={<Plus size={18} />}>
            Add
          </Button>
        </div>
      )}
    </div>
  );
};

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
type HandleParamChange = (
  property: string,
  newValue: undefined | string | string[],
) => void;

const ParamForm: React.FC<{
  setParams: React.Dispatch<React.SetStateAction<Param[]>>;
  param: Param;
  deleteSelf: (paramId: string) => void;
}> = ({ param, setParams, deleteSelf }) => {
  const { id: paramId, type } = param;
  const [choosenParamType, setChoosenParamType] = useState<ParamType>(type);

  const handleParamChange: HandleParamChange = (property, newValue) => {
    setParams((prev) => {
      const newParams = [...prev];
      const index = newParams.findIndex((p) => p.id === paramId);

      newParams[index] = {
        ...newParams[index],
        [property]: newValue,
      };

      if (
        property === "type" &&
        newValue === "string" &&
        param.type === "options"
      ) {
        const intermediate = newParams[index] as OptionsParam;

        const { options, ...rest } = intermediate;

        newParams[index] = rest as Param;
      }
      return newParams;
    });
  };

  return (
    <div className="flex flex-col bg-zinc-200 rounded-sm px-5 py-2 gap-y-2">
      <Input
        placeholder="Enter the parameter name"
        label="Name"
        labelPlacement="outside"
        required
        onChange={(e) => handleParamChange("title", e.target.value)}
      />

      <Select
        selectedKeys={new Set([choosenParamType])}
        placeholder="Select parameter type"
        label="Type"
        labelPlacement="outside"
        disableAnimation
        onChange={(e) => {
          handleParamChange("type", e.target.value);
          handleSelectionChange(
            e,
            setChoosenParamType as (value: string) => void,
          );
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

      {choosenParamType === "options" && (
        <OptionsEditor handleParamChange={handleParamChange} />
      )}

      <Button
        onPress={() => {
          deleteSelf(paramId);
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

const schema = z.object({
  title: z
    .string()
    .min(3, "Minimum 3 characters")
    .nonempty("Title is required"),
  prompt: z
    .string()
    .min(3, "Minimum 3 characters")
    .nonempty("Prompt is required"),
});

type Inputs = z.infer<typeof schema>;

const Add = () => {
  // Ideally, we should be able to use the same component for  edit mode, and if we are inside edit mode, then we need to read the DB first, and use the data as the default values for the snippet meta and parameters

  const [params, setParams] = useState<Param[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Inputs) => {
    const newSnippet = {
      ...data,
      id: nanoid(),
      parameters: params,
    } as Snippet;

    const results = snippetSchema.safeParse(newSnippet);

    if (results.success) {
      // Save data to chrome storage
      console.log(results.data);
    }
  };

  const addDraft = () => {
    // Add new param
    setParams([
      ...params,
      {
        id: nanoid(),
        title: "New Param",
        type: "string",
      },
    ]);
  };

  const deleteDraft = (id: string) => {
    const newParams = params.filter((param) => param.id !== id);

    setParams(newParams);
  };

  return (
    <div className="mt-4">
      <div className="mb-2 flex">
        <Button
          startContent={<Home size={16} />}
          className="ml-auto"
          color="primary"
          as={Link}
          to="/"
          isIconOnly
        />
      </div>

      <form className="flex flex-col gap-y-2" onSubmit={handleSubmit(onSubmit)}>
        <Input
          required
          placeholder="Enter snippet title"
          label="Title"
          {...register("title")}
          labelPlacement="outside"
          errorMessage={errors?.title?.message}
        />

        <Textarea
          required
          placeholder="Enter the prompt here"
          label="Prompt"
          {...register("prompt")}
          labelPlacement="outside"
          errorMessage={errors?.prompt?.message}
        />
        {params.length > 0 && (
          <div className="flex flex-col">
            <span className="block text-small font-medium text-foreground pb-1.5 will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none">
              Parameters
            </span>
            <div className="flex flex-col gap-y-4">
              {params.map((param) => {
                return (
                  <ParamForm
                    setParams={setParams}
                    key={param.id}
                    deleteSelf={deleteDraft}
                    param={param}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* For now let just set the max number of params to 5*/}
        {params.length < 5 && (
          <Button onPress={addDraft} startContent={<Plus size={16} />}>
            Add Param
          </Button>
        )}

        <Button className="self-end mt-4" color="primary" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default Add;
