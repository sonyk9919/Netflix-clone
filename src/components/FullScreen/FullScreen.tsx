import { useRef, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "../../scss/components/fullscreen.scss";
import { IMovie, ITv } from "../../API/Movies";
import QueryString from "qs";

const FullScreen = () => {
  const [content, setContent] = useState<IMovie | ITv>();
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
  useEffect(() => {}, []);
  return (
    <div className="fullScreen__wrapper" onClick={goBack}>
      <motion.div
        className="fullScreen__info"
        layoutId={params.id + "" + sliderId.current}
      ></motion.div>
    </div>
  );
};

export default FullScreen;
