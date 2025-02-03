import { client } from "../utils/fetchData";

export const getMovies = () => {
    return client.getMovies()
};

export const getMovie = (id: string) => {
    return client.getMovieById(id)
};