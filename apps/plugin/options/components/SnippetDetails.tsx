import { useParams } from "react-router-dom";

const SnippetDetails = () => {
  const params = useParams();
  const id = params.id as string;

  return <div>Snippet details for {id}</div>;
};

export default SnippetDetails;
