import React from "react";
import Brand from "./Brand";

export const Default = () => {
  return (
    <div className="flex gap-x-10">
      <Brand />
      <Brand title="Custom Title" />
    </div>
  );
};
