import { useEffect } from "react";
import { useFilePicker } from "use-file-picker";
import { importSnippets } from "../../export-import";

const useImportSnippets = () => {
  const { filesContent, openFilePicker, ...rest } = useFilePicker({
    accept: ".json",
  });

  useEffect(() => {
    (async () => {
      if (filesContent.length > 0) {
        const textContent = filesContent[0].content;

        try {
          // parse the content
          const fileContent = JSON.parse(textContent);

          importSnippets(fileContent);
        } catch (error) {
          // Todo : use toast
          alert("Not a valid snippets file");
        }
      }
    })();
  }, [filesContent]);

  return {
    ...rest,
    filesContent,
    chooseSnippetsFile: openFilePicker,
  };
};

export default useImportSnippets;
