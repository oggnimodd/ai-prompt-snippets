import Routes from "./routes";

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
