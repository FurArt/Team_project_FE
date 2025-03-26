import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit"
import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { getMovies, getMoviesByVibe } from "../api/movie"
import randomNumbersReducer from "./randomNumbersSlice"
import { NavigateFunction } from "react-router-dom"
import { scrollToHandler } from "../utils/scrollToHandler"

const fetchMoviesStore = createAsyncThunk(
  "movies/fetchMovies",
  async (n: number = 100) => {
    const movies = await getMovies(n)
    return movies
  },
)

const fetchMoviesByVibe = createAsyncThunk(
  "movies/fetchMoviesByVibe",
  async ({
    filters,
    page = 0,
    size = 10,
    sort = [],
  }: {
    filters: { vibe: string; years: string; type: string; categories: string[] }
    page?: number
    size?: number
    sort?: string[]
  }) => {
    return await getMoviesByVibe(filters, page, size, sort)
  },
)

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    data: [] as any[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMoviesStore.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchMoviesStore.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false
          state.data = action.payload
        },
      )
      .addCase(fetchMoviesStore.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to load movies"
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

export { fetchMoviesStore, fetchMoviesByVibe }

export const { setLoading } = moviesSlice.actions
