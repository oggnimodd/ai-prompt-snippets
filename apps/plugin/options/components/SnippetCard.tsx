import { FC } from "react";
import type { Snippet } from "../../snippet/model";
import { Link } from "react-router-dom";
import { Trash2 as DeleteIcon } from "lucide-react";
import { Button } from "@nextui-org/react";
import {
  getLocalStorageValue,
  setOrUpdateLocalStorageValue,
} from "../../utils/storage";

const SnippetCard: FC<{
  snippet: Snippet;
  setSnippets: React.Dispatch<React.SetStateAction<Snippet[]>>;
}> = ({ snippet, setSnippets }) => {
  const { title, prompt, id } = snippet;

  const deleteSnippet = async () => {
    try {
      // Get all snippets
      const snippets = (await getLocalStorageValue("snippets")) as Snippet[];
      // Remove snippet with id from snippets
      const newSnippets = snippets.filter((snippet) => snippet.id !== id);

      // Save snippets
      await setOrUpdateLocalStorageValue("snippets", newSnippets);
      setSnippets(newSnippets);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-300 bg-opacity-30 rounded-lg p-4 flex flex-col">
      <span className="font-bold text-xl text-primary-500">{title}</span>
      <p className="line-clamp-3">{prompt}</p>

      <div className="flex justify-between mt-auto items-center">
        <Link to={`/details/${id}`} className="text-primary-400 underline">
          View Details
        </Link>

        <Button
          onClick={deleteSnippet}
          color="primary"
          isIconOnly
          startContent={<DeleteIcon size={18} />}
          variant="light"
          size="sm"
        />
      </div>
    </div>
  );
};

export default SnippetCard;
