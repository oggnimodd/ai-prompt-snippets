import PromptBuilder from "./components/PromptBuilder";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="w-full min-h-screen bg-[#202022] dark p-2 text-base flex flex-col">
      <Header />
      <PromptBuilder />
    </div>
  );
};

export default App;
