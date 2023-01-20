import noImage from "../resource/images/nonImage.png";

export const getPosterImg = (imgurl: string) => {
  if (imgurl === null || imgurl === "") return noImage;
  return `https://image.tmdb.org/t/p/w500/${imgurl}`;
};

export const getBannerImg = (imgurl: string) => {
  if (imgurl === null || imgurl === "") return noImage;
  return `https://image.tmdb.org/t/p/original/${imgurl}`;
};
