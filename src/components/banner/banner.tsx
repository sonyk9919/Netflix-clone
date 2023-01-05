import { IMovie, ITv } from "../../API/Movies";
import { getPosterImg } from "../../API/Poster";
import "../../scss/components/banner.scss";

interface IProps {
  movie: IMovie | ITv;
}

const Banner = ({ movie }: IProps) => {
  return (
    <div
      className="banner"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${getPosterImg(
          movie.backdrop_path
        )})`,
      }}
    >
      <div>
        <p>{movie._brand === "movie" ? movie.overview : movie.overview}</p>
      </div>
    </div>
  );
};

export default Banner;
