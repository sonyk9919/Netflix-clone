import React from "react";
import { useNavigate } from "react-router-dom";
import { IMovie, ITv } from "../../API/Movies";
import { getBannerImg } from "../../API/Poster";
import "../../scss/components/banner.scss";

interface IProps {
  movie: IMovie | ITv;
}

const Banner = ({ movie }: IProps) => {
  const navigate = useNavigate();
  const getName = (content: IMovie | ITv) => {
    if ("title" in content) {
      return content.title;
    } else {
      return content.name;
    }
  };
  return (
    <div
      className="banner"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${getBannerImg(
          movie.backdrop_path
        )})`,
      }}
    >
      <div>
        <p className="title">{getName(movie)}</p>
        <p className="desc">{movie.overview}</p>
        <button
          className="detail"
          onClick={() => {
            navigate(`./${movie.id}`);
          }}
        >
          자세히보기
        </button>
      </div>
    </div>
  );
};

export default React.memo(Banner);
