import PageMessage from "./PageMessage";
import { AiOutlineEuroCircle } from "react-icons/ai";

export const Default = () => {
  return (
    <div>
      <PageMessage
        title="Page Not Found"
        message="Oops! We're sorry, but the page you're looking for can't be found. It's possible that the page has been moved or deleted, or that you've entered the URL incorrectly."
        code={404}
        icon={<AiOutlineEuroCircle />}
      />
    </div>
  );
};
