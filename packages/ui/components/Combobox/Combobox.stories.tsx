import { useState } from "react";
import Combobox from "./Combobox";

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

export const Default = () => {
  const [value, setValue] = useState("Wade Cooper");

  return (
    <div>
      <Combobox
        setChosenValue={(e: string | null) => setValue(e || value)}
        options={people.map((i) => i.name)}
        chosenValue={value}
      />
    </div>
  );
};
