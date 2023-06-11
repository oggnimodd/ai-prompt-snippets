import React from "react";
import clsx from "clsx";

interface NumberIconProps {
  icon: JSX.Element;
  number: number;
  iconPosition?: "left" | "right";
}

const NumberIcon: React.FC<NumberIconProps> = ({
  icon,
  number,
  iconPosition = "left",
}) => {
  return (
    <div
      className={clsx(
        "inline-flex items-center gap-x-[0.2rem] font-medium text-primary-500",
        {
          "flex-row": iconPosition === "left",
          "flex-row-reverse": iconPosition === "right",
        },
      )}
    >
      <div className="text-xl">{icon}</div>
      <span className="text-sm">{number}</span>
    </div>
  );
};

export default NumberIcon;
