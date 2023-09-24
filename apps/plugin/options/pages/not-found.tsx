import { PageMessage } from "@acme/ui";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <PageMessage title="Not Found" message="Oops, Don't Wander too far">
      <Link to="/">
        <Button color="primary" startContent={<ArrowLeft size={18} />}>
          Back to home
        </Button>
      </Link>
    </PageMessage>
  );
};

export default NotFound;
