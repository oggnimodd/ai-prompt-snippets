import { FC } from "react";
import type { Snippet } from "../../snippet/model";
import { Link } from "react-router-dom";

const SnippetCard: FC<Snippet> = ({ title, prompt }) => {
  return (
    <div className="bg-background-300 rounded-lg p-4 flex flex-col">
      <span className="font-bold text-xl text-primary-500">{title}</span>
      <p className="line-clamp-3">{prompt}</p>

      <Link
        to={`/details/${Math.random()}`}
        className="text-primary-400 underline mt-auto pt-5"
      >
        View Details
      </Link>
    </div>
  );
};

export default SnippetCard;
