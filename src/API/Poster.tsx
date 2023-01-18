export const getPosterImg = (imgurl: string) => {
  return `https://image.tmdb.org/t/p/w500/${imgurl}`;
};

export const getBannerImg = (imgurl: string) => {
  return `https://image.tmdb.org/t/p/original/${imgurl}`;
};
