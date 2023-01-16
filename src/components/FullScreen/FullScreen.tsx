import { useRef, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "../../scss/components/FullScreen/fullscreen.scss";
import { IMovie, ITv, getTvDetails, getMovieDetails } from "../../API/Movies";
import QueryString from "qs";
import { getPosterImg } from "../../API/Poster";
import Content from "./Content";

const FullScreen = () => {
  const [movieContent, setMovieContent] = useState<IMovie | null>(null);
  const [tvContent, setTvContent] = useState<ITv | null>(null);
  const [simularContents, setSimularContents] = useState<ITv | IMovie>();
  const sliderId = useRef(
    QueryString.parse(decodeURIComponent(window.location.search).slice(1)).id
  );
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const goBack = () => {
    navigate(-1);
  };
  const url = useRef(location.pathname.split("/"));
  useEffect(() => {
    if (url.current[1] === "tv") {
      getTvDetails(parseInt(url.current[2])).then((tv) =>
        setTvContent((prev) => tv)
      );
    } else {
      getMovieDetails(parseInt(url.current[1])).then((movie) =>
        setMovieContent((prev) => movie)
      );
    }
  }, []);
  const getStarWidth = (rating: number) => {
    return (rating / 10) * 100;
  };
  return (
    <div className="fullScreen__background" onClick={goBack}>
      <motion.div
        className="fullScreen__info"
        layoutId={params.id + "" + sliderId.current}
      >
        <div
          className="fullScreen__info-image"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${getPosterImg(
              movieContent?.backdrop_path ?? tvContent?.backdrop_path ?? ""
            )})`,
          }}
        >
          <p>
            <span>{movieContent?.title ?? tvContent?.name ?? ""}</span>
            <div className="fullScreen__info-rate">
              <div
                className="fullScreen__info-fill-star"
                style={{
                  width: `${getStarWidth(
                    movieContent?.vote_average ?? tvContent?.vote_average ?? 0
                  )}%`,
                }}
              >
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <div className="fullScreen__info-blank-star">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
          </p>
        </div>
        <div className="fullScreen__info-box">
          <div className="fullScreen__info-box__col">
            <span>소개</span>
            <p>
              {movieContent !== null
                ? movieContent.overview
                : tvContent !== null
                ? tvContent.overview
                : ""}
            </p>
            <span>
              평점:{" "}
              {Math.round(
                movieContent?.vote_average ?? tvContent?.vote_average ?? 0
              )}
              점
            </span>
            <p></p>
          </div>
          <div className="fullScreen__info-box__col">
            <span>추천</span>
            <div className="fullScreen__info-box__simular">
              <Content />
              <Content />
              <Content />
              <Content />
              <Content />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FullScreen;
