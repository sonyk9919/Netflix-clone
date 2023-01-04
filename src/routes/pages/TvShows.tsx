import { useState, useEffect } from "react";
import { getTvOnTheAir, IMovies } from "../../API/Movies";
import Banner from "../../components/banner/banner";
import "../../scss/pages/index.scss";

const TvShows = () => {
  const [tvOnTheAir, setTvOnTheAir] = useState<IMovies>();

  useEffect(() => {
    getTvOnTheAir().then((movies) => setTvOnTheAir((prev) => movies));
  }, []);
  return (
    <div className="wrapper">
      {tvOnTheAir && <Banner movie={tvOnTheAir.results[0]} />}
    </div>
  );
};

export default TvShows;
