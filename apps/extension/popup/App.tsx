import ChatProvider from "./components/ChatProvider";
import { useTheme } from "../shared/hooks";

const App = () => {
  useTheme();

  return (
    <div className="w-[300px] p-5">
      <ChatProvider />
    </div>
  );
};

export default App;
