import { Button } from "@nextui-org/react";
import { BookOpen, Home, Upload } from "lucide-react";
import { Snippet } from "models/snippet";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { exportSnippets } from "export-import";
import { DOCS_URL } from "constants/links";

export interface SnippetCreatorWrapperProps {
  children: React.ReactNode;
  snippet?: Snippet;
}

const SnippetCreatorWrapper: FC<SnippetCreatorWrapperProps> = ({
  children,
  snippet,
}) => {
  return (
    <div className="flex flex-col">
      <div className="mb-2 flex ml-auto gap-x-3">
        <Button
          startContent={<BookOpen size={18} />}
          as={Link}
          color="primary"
          target="_blank"
          to={DOCS_URL}
        >
          Docs
        </Button>
        {snippet && (
          // Exporting individual snippet
          <Button
            onPress={() => exportSnippets(snippet)}
            startContent={<Upload size={18} />}
            color="primary"
          >
            Export
          </Button>
        )}
        <Button
          startContent={<Home size={16} />}
          color="primary"
          as={Link}
          to="/"
        >
          Home
        </Button>
      </div>

      {children}
    </div>
  );
};

export default SnippetCreatorWrapper;
