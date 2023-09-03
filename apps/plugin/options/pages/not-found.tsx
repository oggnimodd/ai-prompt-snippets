import { Button, PageMessage } from "@acme/ui";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <PageMessage title="Not Found" message="Oops, Don't Wander too far">
      <Link to="/">
        <Button>Back to home</Button>
      </Link>
    </PageMessage>
  );
};

export default NotFound;
