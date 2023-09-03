import Routes from "./routes";

const App = () => {
  return (
    <div className="flex w-full text-base bg-background-500">
      <div className="w-full min-h-screen text-white mx-auto lg:max-w-[1100px] px-4 lg:px-20 xl:px-0">
        <Routes />
      </div>
    </div>
  );
};

export default App;
