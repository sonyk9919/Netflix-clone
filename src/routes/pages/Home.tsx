import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getNowPlayingMovies, IMovies } from "../../API/Movies";
import Banner from "../../components/banner/banner";
import Slider from "../../components/slider/slider";
import "../../scss/pages/index.scss";

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState<IMovies>();

  useEffect(() => {
    getNowPlayingMovies().then((data) => {
      setNowPlaying((prev) => data);
    });
  }, []);

  return (
    <div className="page__wrapper">
      {nowPlaying && <Banner movie={nowPlaying.results[0]} />}
      {nowPlaying && <Slider contents={nowPlaying.results.slice(1)} />}
      <Outlet />
    </div>
  );
};

export default Home;
