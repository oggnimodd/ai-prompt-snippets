import { Home, Add, Details, NotFound } from "./pages";
import { Routes, Route } from "react-router-dom";

const routes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<Add />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default routes;
