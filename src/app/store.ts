import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit"
import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { getMovies } from "../api/movie"

const fetchMoviesStore = createAsyncThunk("movies/fetchMovies", async () => {
  const movies = await getMovies()
  return movies
})

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    data: [] as any[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
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

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>

export { fetchMoviesStore }
