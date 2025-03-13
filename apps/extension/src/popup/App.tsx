import ChatProviders from "./components/ChatProviders";
import { useTheme } from "../shared/hooks";

const App = () => {
  useTheme();

  return (
    <div className="w-[300px] p-5">
      <ChatProviders />
    </div>
  );
};

export default App;
