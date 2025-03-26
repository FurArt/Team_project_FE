import { MovieData } from "../types/movie"
import { client } from "../utils/fetchData"

export const getMovies = (
  page: number = 0,
  size: number = 10,
  sort: string[] = [],
) => {
  return client.getMovies<MovieData[]>(page, size, sort)
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

export const getMoviesByVibe = (
  data: { vibe: string; years: string; type: string; categories: string[] },
  page: number = 0,
  size: number = 10,
  sort: string[] = [],
) => {
  return client.getMoviesByVibe<MovieData[]>(data, page, size, sort)
}
