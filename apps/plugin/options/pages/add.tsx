import { useForm } from "react-hook-form";
import { Input, Button, Textarea, Select, SelectItem } from "@nextui-org/react";
import { Plus } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useRef } from "react";
import { nanoid } from "nanoid";
import { X as CloseIcon } from "lucide-react";

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

const OptionsEditor = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

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
      <span className="block text-small font-medium text-foreground pb-1.5 will-change-auto origin-top-left transition-all !duration-200 !ease-out motion-reduce:transition-none">
        Parameters
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
        <div className="flex flex-col gap-y-2 gap-x-4">
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

const ParamForm: React.FC<{
  paramId: string;
  deleteSelf: (paramId: string) => void;
}> = ({ paramId, deleteSelf }) => {
  const [choosenParamType, setChoosenParamType] = useState<ParamType>("string");

  return (
    <div className="flex flex-col bg-zinc-200 rounded-sm px-5 py-2 gap-y-2">
      <Input
        placeholder="Enter the parameter name"
        label="Name"
        labelPlacement="outside"
        required
      />

      <Select
        selectedKeys={new Set([choosenParamType])}
        placeholder="Select parameter type"
        label="Type"
        labelPlacement="outside"
        disableAnimation
        onChange={(e) =>
          handleSelectionChange(
            e,
            setChoosenParamType as (value: string) => void,
          )
        }
      >
        {paramTypes.map((paramType) => {
          return (
            <SelectItem key={paramType.value} value={paramType.value}>
              {paramType.label}
            </SelectItem>
          );
        })}
      </Select>

      {choosenParamType === "options" && <OptionsEditor />}

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

  const [params, setParams] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Inputs) => {
    console.log(data);
  };

  const addDraft = () => {
    // Add new param
    setParams([...params, nanoid()]);
  };

  const deleteDraft = (index: string) => {
    const newParams = params.filter((param) => param !== index);

    setParams(newParams);
  };

  return (
    <div className="mt-4">
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
              {params.map((paramId) => {
                return (
                  <ParamForm
                    key={paramId}
                    deleteSelf={deleteDraft}
                    paramId={paramId}
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
