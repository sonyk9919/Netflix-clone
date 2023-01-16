import { IMovie, ITv } from "../../API/Movies";
import { getPosterImg } from "../../API/Poster";
import "../../scss/components/FullScreen/content.scss";

interface IProps {
  Content: IMovie | ITv;
}

const Content = ({ Content }: IProps) => {
  return (
    <div className="content__wrapper">
      <div
        className="content__col"
        style={{
          backgroundImage: `url(${getPosterImg(Content.backdrop_path)})`,
        }}
      ></div>
      <div className="content__col">
        {"title" in Content
          ? Content.title
          : "name" in Content
          ? Content.name
          : ""}
      </div>
    </div>
  );
};

export default Content;
