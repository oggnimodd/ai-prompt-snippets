import { useState } from "react";
import Combobox, { Option } from "./Combobox";

const people: Option[] = [
  { key: "1", label: "Wade Cooper" },
  { key: "2", label: "Wade Coope awgeagewr" },
  { key: "3", label: "Kojgeaw" },
  { key: "4", label: "gewa Coope awgeagewr" },
  { key: "5", label: "Wadaaae Coope awgeagewr" },
];

export const Default = () => {
  const [value, setValue] = useState<Option>(people[0] as Option);

  return (
    <div>
      <Combobox setSelected={setValue} options={people} selected={value} />
    </div>
  );
};
