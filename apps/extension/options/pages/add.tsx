import { SnippetCreator } from "../components";
import { Button } from "@nextui-org/react";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const Add = () => {
  return (
    <div>
      {/* TODO : create a reusable layout for this kind of page */}

      <div className="mb-2 flex">
        <Button
          startContent={<Home size={16} />}
          className="ml-auto"
          color="primary"
          as={Link}
          to="/"
          isIconOnly
        />
      </div>

      <SnippetCreator />
    </div>
  );
};

export default Add;
