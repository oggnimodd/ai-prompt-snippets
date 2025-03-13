import PromptBuilder from "./components/PromptBuilder";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="w-full min-h-screen p-2 text-base flex flex-col">
      <Header />
      <PromptBuilder />
    </div>
  );
};

export default App;
