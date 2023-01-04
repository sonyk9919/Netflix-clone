import axios from "axios";

const APIKEY = process.env.REACT_APP_API_KEY;

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

// Movies
export const getNowPlayingMovies = async () => {
  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=ko-KR&page=1`
  );
  return data.data;
};

export interface ITv {
  poster_path: string;
  name: string;
  vote_average: number;
}

export interface ITvs {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}
// Tv Shows
export const getTvOnTheAir = async () => {
  const data = await axios.get(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${APIKEY}&language=ko-KR&page=1`
  );
  return data.data;
};
