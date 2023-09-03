import { FC } from "react";

import type { Snippet } from "../../snippet/model";

const SnippetCard: FC<Snippet> = ({ title, prompt }) => {
  return (
    <div className="bg-background-300 rounded-lg p-4">
      <span className="font-bold text-xl text-primary-500">{title}</span>
      <p className="line-clamp-3">{prompt}</p>
    </div>
  );
};

export default SnippetCard;
