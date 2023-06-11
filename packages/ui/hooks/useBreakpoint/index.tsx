import { useMediaQuery } from "../useMediaQuery";

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export type BreakpointKey = keyof typeof breakpoints;

export const useBreakpoint = <K extends BreakpointKey>(breakpointKey: K) => {
  const bool = useMediaQuery(
    `(min-width: ${breakpoints[breakpointKey]})`,
    true,
    { getInitialValueInEffect: false },
  );

  return bool;
};
