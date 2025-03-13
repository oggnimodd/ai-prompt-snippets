import { useEffect } from "react";
import { useFilePicker } from "use-file-picker";
import { importSnippets } from "../../export-import";

interface ImportSnippetsProps {
  onSuccess: () => void;
  onError: (err: unknown) => void;
}

const useImportSnippets = ({ onSuccess, onError }: ImportSnippetsProps) => {
  const { filesContent, openFilePicker, clear, ...rest } = useFilePicker({
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
        } finally {
          clear();
        }
      }
    })();
  }, [filesContent]);

  return {
    ...rest,
    filesContent,
    clear,
    chooseSnippetsFile: openFilePicker,
  };
};

export default useImportSnippets;
