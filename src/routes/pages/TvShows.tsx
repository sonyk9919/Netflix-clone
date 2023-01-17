import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import { getTvPopular, getTvTopRated, ITvs } from "../../API/Movies";
import Banner from "../../components/banner/banner";
import Slider from "../../components/slider/slider";
import "../../scss/pages/index.scss";

const TvShows = () => {
  const [tvOnTheAir, setTvOnTheAir] = useState<ITvs>();
  const [tvTopRated, setTvTopRated] = useState<ITvs>();

  useEffect(() => {
    getTvPopular().then((data) => setTvOnTheAir((prev) => data));
    getTvTopRated().then((data) => setTvTopRated((prev) => data));
  }, []);
  return (
    <div className="page__wrapper">
      <Helmet>
        <title>Netflix | TV</title>
      </Helmet>
      {tvOnTheAir && <Banner movie={tvOnTheAir.results[0]} />}
      {tvOnTheAir && (
        <Slider
          contents={tvOnTheAir.results.slice(1)}
          category="현재 방영중인 TV프로그램"
          sliderId={1}
        />
      )}
      {tvTopRated && (
        <Slider
          contents={tvTopRated.results}
          sliderId={2}
          category="역대 최고의 TV 프로그램"
        />
      )}
      <Outlet />
    </div>
  );
};

export default TvShows;
