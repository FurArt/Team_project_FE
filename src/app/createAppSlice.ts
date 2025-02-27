// createAppSlice.ts
import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMovies } from "../api/movie";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const movies = await getMovies();
  return movies;
});

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
