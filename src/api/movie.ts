import { MovieData, MoviesData } from "../types/movie"
import { TitleData } from "../types/title"
import { TopListTypes } from "../types/TopListTypes"
import { VibeMoviesData } from "../types/vibe"
import { client } from "../utils/fetchData"

export const getTitleMovie = (
  years?: string, page?: number, size?: number, sort?: string
) => {
  return client.getTitleMovie(page, size, sort) as Promise<TitleData>
}

export const getMovies = (
  page: number = 0,
  size: number = 100,
  sort: string[] = [],
) => {
  return client.getMovies(page, size, sort) as Promise<MoviesData>
}



export const getMovie = (id: string) => {
  return client.getMovieById<MovieData>(id)
}

export const getMovieByLuck = (size: number) => {
  return client.getMovieByLuck<MovieData>(size)
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
): Promise<VibeMoviesData> => {
  return client.getMoviesByVibe<VibeMoviesData>(data, page, size, sort)
}

export const getMediaGallery = (
  title?: string,
  years?: string,
  type?: string,
  page: number = 0,
  size: number = 100,
  sort: string[] = []
) => {
  return client.getMediaGallery(title, years, type, page, size, sort);
};



export const getTopListMovies = (
  listType: TopListTypes, 
  page: number = 0,
  size: number = 10,
  sort: string[] = ["rating"]
) => {
  return client.getTopListMovies(listType, page, size, sort);
};