import { useEffect } from "react";
import { useFilePicker } from "use-file-picker";
import { importSnippets } from "../../export-import";

interface ImportSnippetsProps {
  onSuccess: () => void;
  onError: (err: unknown) => void;
}

const useImportSnippets = ({ onSuccess, onError }: ImportSnippetsProps) => {
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
          await importSnippets(fileContent);
          onSuccess();
        } catch (error) {
          onError(error);
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
