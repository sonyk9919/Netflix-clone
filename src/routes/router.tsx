import { Helmet } from "react-helmet";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FullScreen from "../components/FullScreen/FullScreen";
import Header from "../components/header/header";
import favicon from "../resource/images/favicon.png";
import React from "react";

const Home = React.lazy(() => import("./pages/Home"));
const TvShows = React.lazy(() => import("./pages/TvShows"));

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Helmet>
        <link rel="icon" href={favicon} />
      </Helmet>
      <Header />
      <React.Suspense>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path=":id" element={<FullScreen />} />
          </Route>
          <Route path="/tv" element={<TvShows />}>
            <Route path=":id" element={<FullScreen />} />
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default Router;
