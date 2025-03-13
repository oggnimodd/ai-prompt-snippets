import Routes from "./routes";
import { getLocalStorageValue } from "utils/storage";
import { Toaster } from "react-hot-toast";
import { useTheme } from "shared/hooks";

(async () => {
  const results = await getLocalStorageValue("snippets");
  console.log(results);
})();

const App = () => {
  useTheme();
  return (
    <>
      <Toaster toastOptions={{ duration: 10000 }} position="bottom-right" />
      <div className="flex w-full text-base">
        <div className="w-full min-h-screen mx-auto lg:max-w-[800px] px-4 lg:px-20 xl:px-0 pb-10 my-8">
          <Routes />
        </div>
      </div>
    </>
  );
};

export default App;
