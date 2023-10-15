import { Button } from "@nextui-org/react";
import { Home, Upload } from "lucide-react";
import { Snippet } from "models/snippet";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { exportSnippets } from "export-import";

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
