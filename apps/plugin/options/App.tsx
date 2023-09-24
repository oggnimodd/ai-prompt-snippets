import Routes from "./routes";
import { getLocalStorageValue } from "../utils/storage";

(async () => {
  const results = await getLocalStorageValue("snippets");
  console.log(results);
})();

const App = () => {
  return (
    <div className="flex w-full text-base">
      <div className="w-full min-h-screen mx-auto lg:max-w-[1100px] px-4 lg:px-20 xl:px-0">
        <Routes />
      </div>
    </div>
  );
};

export default App;
