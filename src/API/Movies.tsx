import axios from "axios";

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

export interface IMovies {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_result: number;
}

export const getNowPlayingMovies = async () => {
  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=ko-KR&page=1`
  );
  return data.data;
};
