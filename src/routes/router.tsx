import { BrowserRouter, Routes, Route } from "react-router-dom";
import FullScreen from "../components/FullScreen/FullScreen";
import Header from "../components/header/header";
import Home from "./pages/Home";
import TvShows from "./pages/TvShows";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path=":id" element={<FullScreen />} />
        </Route>
        <Route path="/tv" element={<TvShows />}>
          <Route path=":id" element={<FullScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
