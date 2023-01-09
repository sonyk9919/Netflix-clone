import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { IMovie, ITv } from "../../API/Movies";
import { getPosterImg } from "../../API/Poster";
import "../../scss/components/slider.scss";
import NonImage from "../../resource/images/nonImage.png";
import { useNavigate } from "react-router-dom";

interface IProps {
  contents: IMovie[] | ITv[];
  category: string;
  sliderId: number | string;
}

type IDevice = "mobile" | "tablet" | "desktop";

const getDevice = (size: number): IDevice => {
  if (size > 1024) {
    return "desktop";
  } else if (size > 768 && size <= 1024) {
    return "tablet";
  } else {
    return "mobile";
  }
};

const mobileOffset = 1;
const tabletOffset = 2;
const desktopOffset = 6;

const SliderVar: Variants = {
  inner: ({ inverse }) => ({
    x: inverse ? -window.innerWidth - 30 : window.innerWidth + 30,
  }),
  stop: { x: 0, transition: { bounce: 0, duration: 1 } },
  outter: ({ inverse }) => ({
    x: inverse ? window.innerWidth + 30 : -window.innerWidth - 30,
    transition: { duration: 1, bounce: 0 },
  }),
};

const ElementVar: Variants = {
  initial: {},
  hover: ({ device }) => ({
    scale: device === "desktop" ? 1.3 : device === "tablet" ? 1.2 : 1.1,
    zIndex: 85,
    transition: { bounce: 0, delay: 0.5, duration: 0.5, delayChildren: 0.7 },
  }),
};

const ElementImageVar: Variants = {
  initial: { height: "100%" },
  hover: { height: "80%", transition: { bounce: 0 } },
};

const ElementInfoVar: Variants = {
  initial: { opacity: 0 },
  hover: { opacity: 1, display: "flex", transition: { bounce: 0 } },
};

const Slider = ({ contents, category, sliderId }: IProps) => {
  const [device, setDevice] = useState<IDevice>(getDevice(window.innerWidth));
  const [header, setHeader] = useState<number>(0);
  const [inverse, setInverse] = useState<boolean>(false);
  const [animate, setAnimate] = useState<boolean>(false);
  const navigate = useNavigate();
  const onElementClick = (id: number) => {
    navigate(`./${id}?${encodeURIComponent("id=" + sliderId)}`);
  };
  const reSize = () => {
    setDevice((prev) => getDevice(window.innerWidth));
  };
  const retElement = (device: IDevice) => {
    if (device === "desktop") {
      return contents.slice(header, header + desktopOffset);
    } else if (device === "tablet") {
      return contents.slice(header, header + tabletOffset);
    } else {
      return contents.slice(header, header + mobileOffset);
    }
  };
  const onNext = () => {
    const remain = contents.length - header;
    if (!animate) {
      setAnimate((prev) => true);
      setInverse((prev) => false);
      if (device === "desktop") {
        setHeader((prev) =>
          remain - desktopOffset > 0 ? prev + desktopOffset : 0
        );
      } else if (device === "tablet") {
        setHeader((prev) =>
          remain - tabletOffset > 0 ? prev + tabletOffset : 0
        );
      } else {
        setHeader((prev) =>
          remain - mobileOffset > 0 ? prev + mobileOffset : 0
        );
      }
    }
  };
  const onPrev = () => {
    if (!animate) {
      setInverse((prev) => true);
      setAnimate((prev) => true);
      if (device === "desktop") {
        setHeader((prev) =>
          header - desktopOffset > 0 ? prev - desktopOffset : 0
        );
      } else if (device === "tablet") {
        setHeader((prev) =>
          header - tabletOffset > 0 ? prev - tabletOffset : 0
        );
      } else {
        setHeader((prev) =>
          header - mobileOffset > 0 ? prev - mobileOffset : 0
        );
      }
    }
  };
  const getTransformOrigin = (idx: number) => {
    if (device === "desktop") {
      return idx === 0
        ? "left bottom"
        : idx === desktopOffset - 1
        ? "right bottom"
        : "center bottom";
    } else if (device === "tablet") {
      return idx === 0 ? "left bottom" : "right bottom";
    } else {
      return "center bottom";
    }
  };
  useEffect(() => {
    window.addEventListener("resize", reSize);
    return () => {
      window.removeEventListener("resize", reSize);
    };
  }, []);
  return (
    <div className="slider__wrapper">
      <p>{category}</p>
      <button
        className="prev"
        type="button"
        onClick={onPrev}
        disabled={header === 0}
      >
        {"<"}
      </button>
      <AnimatePresence
        custom={{ inverse }}
        onExitComplete={() => {
          setAnimate((prev) => false);
        }}
      >
        <motion.div
          key={header}
          custom={{ inverse }}
          variants={SliderVar}
          initial="inner"
          animate="stop"
          exit="outter"
          className="slider__row"
        >
          {retElement(device).map((item, idx) => (
            <motion.div
              key={idx}
              variants={ElementVar}
              custom={{ device }}
              onClick={() => {
                onElementClick(item.id);
              }}
              layoutId={item.id + "" + sliderId}
              initial="initial"
              whileHover="hover"
              className="slider__col"
              style={{
                transformOrigin: getTransformOrigin(idx),
              }}
            >
              <motion.div
                className="slider__col-image"
                variants={ElementImageVar}
                style={{
                  backgroundImage: `url(${
                    item.backdrop_path !== null
                      ? getPosterImg(item.backdrop_path)
                      : NonImage
                  })`,
                }}
              />
              <motion.div
                className="slider__col-info"
                variants={ElementInfoVar}
              >
                {"title" in item ? item.title : "name" in item ? item.name : ""}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <button className="next" type="button" onClick={onNext}>
        {">"}
      </button>
    </div>
  );
};

export default Slider;
