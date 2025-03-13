import path from "node:path";
import fs from "fs-extra";

const filesToDelete = [
  "extension/dist",
  "extension/manifest.json",
  ...fs.readdirSync(".").filter((file) => file.startsWith("extension.")),
];

filesToDelete.forEach((file) => {
  fs.removeSync(path.resolve(file));
});

console.log("Cleared specified files and directories.");
