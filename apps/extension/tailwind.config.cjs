/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [require("@acme/tailwind-config")],
  content: [
    "../../packages/ui/components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./src//popup/**/*.{js,ts,jsx,tsx}",
    "./src/options/**/*.{js,ts,jsx,tsx}",
    "./src/iframe/**/*.{js,ts,jsx,tsx}",
    // NextUI spesific
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
};
