import Routes from "./routes";
import { getLocalStorageValue } from "utils/storage";
import { useDarkMode } from "shared/hooks";

(async () => {
  const results = await getLocalStorageValue("snippets");
  console.log(results);
})();

const App = () => {
  const { toggleTheme } = useDarkMode();

  return (
    <div className="flex w-full text-base">
      <div className="w-full min-h-screen mx-auto lg:max-w-[800px] px-4 lg:px-20 xl:px-0 pb-10">
        <button onClick={toggleTheme}>toggle theme</button>
        <Routes />
      </div>
    </div>
  );
};

export default App;
