import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getNowPlayingMovies, getTopRated, IMovies } from "../../API/Movies";
import Banner from "../../components/banner/banner";
import Slider from "../../components/slider/slider";
import "../../scss/pages/index.scss";

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState<IMovies>();
  const [topRated, setTopRated] = useState<IMovies>();

  useEffect(() => {
    getNowPlayingMovies().then((data) => {
      setNowPlaying((prev) => data);
    });
    getTopRated().then((data) => {
      setTopRated((prev) => data);
    });
  }, []);

  return (
    <div className="page__wrapper">
      <Helmet>
        <title>Netflix | Home</title>
      </Helmet>
      {nowPlaying && <Banner movie={nowPlaying.results[0]} />}
      {nowPlaying && (
        <Slider
          contents={nowPlaying.results.slice(1)}
          category="현재 상영중인 영화"
          sliderId={1}
        />
      )}
      {topRated && (
        <Slider
          contents={topRated.results}
          category="역대 최고의 영화"
          sliderId={2}
        />
      )}
      <Outlet />
    </div>
  );
};

export default Home;
