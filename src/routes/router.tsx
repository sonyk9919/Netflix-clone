import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/header/header";
import Home from "./pages/Home";
import TvShows from "./pages/TvShows";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv" element={<TvShows />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
