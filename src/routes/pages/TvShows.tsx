import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getTvPopular, ITvs } from "../../API/Movies";
import Banner from "../../components/banner/banner";
import Slider from "../../components/slider/slider";
import "../../scss/pages/index.scss";

const TvShows = () => {
  const [tvOnTheAir, setTvOnTheAir] = useState<ITvs>();

  useEffect(() => {
    getTvPopular().then((movies) => setTvOnTheAir((prev) => movies));
  }, []);
  return (
    <div className="page__wrapper">
      {tvOnTheAir && <Banner movie={tvOnTheAir.results[0]} />}
      {tvOnTheAir && <Slider contents={tvOnTheAir.results.slice(1)} />}
      <Outlet />
    </div>
  );
};

export default TvShows;
