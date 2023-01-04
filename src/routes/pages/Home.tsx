import { useEffect, useState } from "react";
import { getNowPlayingMovies, IMovies } from "../../API/Movies";
import Banner from "../../components/banner/banner";
import "../../scss/pages/index.scss";

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState<IMovies>();

  useEffect(() => {
    getNowPlayingMovies().then((data) => {
      setNowPlaying((prev) => data);
    });
  }, []);

  return (
    <div className="wrapper">
      {nowPlaying && <Banner movie={nowPlaying.results[0]} />}
    </div>
  );
};

export default Home;
