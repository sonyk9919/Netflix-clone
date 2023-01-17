import React, { useState, useEffect } from "react";
import "../../scss/components/header.scss";
import { Link } from "react-router-dom";
import { Variants, motion, useAnimationControls } from "framer-motion";
import { useMatch } from "react-router-dom";

const Header = () => {
  const home = useMatch("/");
  const tv = useMatch("/tv");
  const inputControl = useAnimationControls();
  const searchControl = useAnimationControls();
  const [search, setSearch] = useState<boolean>(false);

  const clickSearch = () => {
    setSearch((prev) => !prev);
  };
  const inputVar: Variants = {
    on: { scaleX: 1, transition: { bounce: 0 } },
    off: { scaleX: 0, transition: { bounce: 0 } },
  };

  const searchVar: Variants = {
    on: {
      x: -5,
      transition: { bounce: 0 },
    },
    off: {
      x: 130,
      transition: { bounce: 0 },
    },
  };
  useEffect(() => {
    if (search) {
      inputControl.start("on");
      searchControl.start("on");
    } else {
      inputControl.start("off");
      searchControl.start("off");
    }
  }, [search, inputControl, searchControl]);

  return (
    <div className="Wrapper">
      <div className="container">
        <div className="column">
          <Link to="/" className="logo">
            Netflix
          </Link>
          <ul>
            <li>
              <Link to="/">홈</Link>
              {home && <motion.div className="badge" layoutId="badge" />}
            </li>
            <li>
              <Link to="/tv">TV</Link>
              {tv && <motion.div className="badge" layoutId="badge" />}
            </li>
          </ul>
        </div>
        <div className="column">
          <motion.svg
            animate={searchControl}
            variants={searchVar}
            initial="off"
            fill="white"
            className="search"
            viewBox="0 0 24 24"
            onClick={clickSearch}
          >
            <g id="search">
              <path
                d="M22.3,23.7l-6.8-6.8c-1.6,1.3-3.7,2.1-6,2.1C4.3,19,0,14.7,0,9.5S4.3,0,9.5,0S19,4.3,19,9.5c0,2.3-0.8,4.3-2.1,6l6.8,6.8
		L22.3,23.7z M9.5,2C5.4,2,2,5.4,2,9.5S5.4,17,9.5,17S17,13.6,17,9.5S13.6,2,9.5,2z"
              />
            </g>
          </motion.svg>
          <motion.input
            style={{ transformOrigin: "100% 50%" }}
            animate={inputControl}
            variants={inputVar}
            initial="off"
            type="text"
            placeholder="검색어를 입력하세요"
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Header);
