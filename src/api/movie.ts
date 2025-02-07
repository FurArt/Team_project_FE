import { Movie, MovieData } from "../types/movie";
import { client } from "../utils/fetchData";

export const getMovies = () => {
  return client.getMovies<Movie[]>();
};

export const getMovie = (id: string) => {
  return client.getMovieById<Movie>(id);
};

export const addMovie = (data: MovieData) => {
  return client.addMovie<Movie>(data);
};

export const updateMovie = (id: string, data: MovieData) => {
  return client.updateMovie<Movie>(id, data);
};

export const deleteMovie = (id: string) => {
  return client.deleteMovie(id);
};