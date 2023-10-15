import { Button } from "@nextui-org/react";
import { Home } from "lucide-react";
import React, { FC } from "react";
import { Link } from "react-router-dom";

export interface SnippetCreatorWrapperProps {
  children: React.ReactNode;
}

const SnippetCreatorWrapper: FC<SnippetCreatorWrapperProps> = ({
  children,
}) => {
  return (
    <div>
      <div className="mb-2 flex">
        <Button
          startContent={<Home size={16} />}
          className="ml-auto"
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
