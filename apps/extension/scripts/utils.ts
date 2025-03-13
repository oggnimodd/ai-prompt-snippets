import path from "node:path";

export const isDev = process.env.NODE_ENV !== "production";
export const isFirefox = process.env.EXTENSION === "firefox";

export const r = (...args: string[]) => path.resolve(__dirname, "..", ...args);
export const port = Number(process.env.PORT || "") || 3303;
