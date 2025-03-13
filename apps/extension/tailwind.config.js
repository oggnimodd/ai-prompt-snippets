import acmeTailwindConfig from "@acme/tailwind-config";

/** @type {import("tailwindcss").Config} */
export default {
  presets: [acmeTailwindConfig],
  content: [
    "../../packages/ui/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/popup/**/*.{js,ts,jsx,tsx}",
    "./src/options/**/*.{js,ts,jsx,tsx}",
    "./src/iframe/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
};
