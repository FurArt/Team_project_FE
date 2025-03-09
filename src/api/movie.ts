import { MovieData } from "../types/movie"
import { client } from "../utils/fetchData"

export const getMovies = (n: number) => {
  return client.getMovies<MovieData[]>(n)
}

export const getMovie = (id: string) => {
  return client.getMovieById<MovieData>(id)
}

export const addMovie = (data: MovieData) => {
  return client.addMovie<MovieData>(data)
}

export const updateMovie = (id: string, data: MovieData) => {
  return client.updateMovie<MovieData>(id, data)
}

export const deleteMovie = (id: string) => {
  return client.deleteMovie(id)
}
