import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const loadingCva = tv({
  base: "relative animate-rotate-360 inline-block rounded-full line-normal flex",
  variants: {
    size: {
      button: "border-[3px] w-[28px] h-[28px]",
      normal: "border-[5px] w-[48px] h-[48px]",
    },
    color: {
      white: "border-white border-b-transparent",
      primary: "border-primary-500 border-b-transparent",
    },
  },
  defaultVariants: {
    size: "normal",
    color: "primary",
  },
});

export type LoadingProps = VariantProps<typeof loadingCva>;

const Loading: React.FC<LoadingProps> = ({ size, color }) => {
  return (
    <div
      data-cy="loading-indicator"
      className={loadingCva({
        size,
        color,
      })}
    />
  );
};

export default Loading;
