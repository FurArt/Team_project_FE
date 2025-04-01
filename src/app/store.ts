import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit"
import type { Action, ThunkAction } from "@reduxjs/toolkit"
import {
  getMovie,
  getMovies,
  getMoviesByVibe,
  getMovieByLuck,
} from "../api/movie"
import randomNumbersReducer from "./randomNumbersSlice"
import { NavigateFunction } from "react-router-dom"
import { scrollToHandler } from "../utils/scrollToHandler"
import { MovieData, MoviesData, MoviesState } from "../types/movie"
import { VibeMoviesData } from "../types/vibe"

// const fetchMoviesPoster = createAsyncThunk("movies/fetchMovies", async () => {
//   const movies = await getMovies()
//   return movies
// })

const fetchMoviesPoster = createAsyncThunk<MoviesData, void>(
  "movies/fetchMovies",
  async () => {
    const movies = await getMovies()
    return movies
  },
)

const fetchMovieById = createAsyncThunk<MovieData, string>(
  "movies/fetchById",
  async id => {
    const response = await getMovie(id)
    return response
  },
)

const fetchMovieByLuck = createAsyncThunk<MovieData, number>(
  "movies/luck",
  async (size: number = 1) => {
    const response = await getMovieByLuck(size)
    return response
  },
)

const fetchMoviesByVibe = createAsyncThunk<
  VibeMoviesData,
  {
    filters: { vibe: string; years: string; type: string; categories: string[] }
    page?: number
    size?: number
    sort?: string[]
  }
>(
  "movies/fetchMoviesByVibe",
  async ({ filters, page = 0, size = 10, sort = [] }) => {
    return await getMoviesByVibe(filters, page, size, sort)
  },
)

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    data: null as MoviesData | null,
    selectedMovie: null as MovieData | null,
    loading: false,
    error: null as string | null,
    vibe: null as VibeMoviesData | null,
  },
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMoviesPoster.pending, state => {
        state.loading = true
        state.error = null
      })
      // .addCase(
      //   fetchMoviesPoster.fulfilled,
      //   (state, action: PayloadAction<MoviesData | null>) => {
      //     state.loading = false
      //     state.data = action.payload
      //   },
      // )
      .addCase(
        fetchMoviesPoster.fulfilled,
        (state, action: PayloadAction<MoviesData>) => {
          state.loading = false
          state.data = action.payload
        },
      )
      .addCase(fetchMoviesPoster.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to load movies"
      })
      .addCase(fetchMoviesByVibe.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchMoviesByVibe.fulfilled,
        (state, action: PayloadAction<VibeMoviesData>) => {
          state.loading = false
          state.vibe = action.payload
        },
      )
      .addCase(fetchMoviesByVibe.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to load movies by vibe"
      })
      .addCase(fetchMovieById.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchMovieById.fulfilled,
        (state, action: PayloadAction<MovieData>) => {
          state.loading = false
          state.selectedMovie = action.payload
        },
      )
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to load movie by ID"
      })
      .addCase(fetchMovieByLuck.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchMovieByLuck.fulfilled,
        (state, action: PayloadAction<MovieData>) => {
          state.loading = false
          state.selectedMovie = action.payload
        },
      )
      .addCase(fetchMovieByLuck.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to load movie by ID"
      })
  },
})

const rootReducer = combineReducers({
  movies: moviesSlice.reducer,
  randomNumbers: randomNumbersReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    preloadedState,
  })
}

export const store = makeStore()

export const handleSelectMovie =
  (e: React.MouseEvent, id: string, navigate: NavigateFunction): AppThunk =>
  dispatch => {
    navigate(`../movie?idMovie=${id}`)
    scrollToHandler(e)
  }

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>

export {
  fetchMoviesPoster,
  fetchMovieById,
  fetchMoviesByVibe,
  fetchMovieByLuck,
}

export const { setLoading } = moviesSlice.actions
