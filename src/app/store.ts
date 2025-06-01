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
  getTitleMovie,
  getMediaGallery,
  getTopListMovies,
  getTitleMovieSearch,
} from "../api/movie"
import randomNumbersReducer from "./randomNumbersSlice"
import { NavigateFunction } from "react-router-dom"
import { scrollToHandler } from "../utils/scrollToHandler"
import { Movie, MovieData } from "../types/movie"
import {
  CategoryTypes,
  MediaTypes,
  VibeMovie,
  VibeMoviesData,
  VibeTypes,
} from "../types/vibe"
import { TitleData } from "../types/title"
import { FetchGalleryParams, GalleryData } from "../types/gallery"
import { TopListMovieResponse, TopListTypes } from "../types/TopListTypes"

const fetchMoviesByVibe = createAsyncThunk<
  VibeMoviesData,
  {
    data: {
      vibe?: VibeTypes
      years?: string
      type: MediaTypes
      categories?: string[]
    }
    page?: number
    size?: number
    sort?: string[]
  },
  { rejectValue: string[] }
>(
  "movies/fetchMoviesByVibe",
  async (
    { data, page = 0, size = 8, sort = ["rating"] },
    { rejectWithValue },
  ) => {
    try {
      const response = await getMoviesByVibe(data, page, size, sort)
      return response
    } catch (err: any) {
      const errorResponse = await err?.response?.json?.()
      const errors = errorResponse?.errors ?? ["Unknown error occurred"]
      return rejectWithValue(errors)
    }
  },
)

const fetchTopListMovies = createAsyncThunk<
  TopListMovieResponse,
  {
    listType: TopListTypes
    page?: number
    size?: number
    sort?: string[]
  },
  { rejectValue: string }
>(
  "movies/fetchTopListMovies",
  async (
    { listType, page = 0, size = 100, sort = ["rating"] },
    { rejectWithValue },
  ) => {
    try {
      const response = await getTopListMovies(listType, page, size, sort)
      return response as TopListMovieResponse
    } catch (err) {
      return rejectWithValue("Failed to fetch top list movies")
    }
  },
)

const fetchMoviesGllery = createAsyncThunk<GalleryData, FetchGalleryParams>(
  "movies/fetchGlleryMovies",
  async ({ title = "", years = "", type = "", page = 0, size = 114, sort }) => {
    const movies = (await getMediaGallery(
      title,
      years,
      type,
      page,
      size,
      sort,
    )) as GalleryData
    return movies
  },
)

const fetchMoviesAllTitle = createAsyncThunk<TitleData, void>(
  "movies/fetchTitleMovies",
  async () => {
    const movies = await getTitleMovie()
    return movies
  },
)

const fetchMoviesPoster = createAsyncThunk<Movie[], void>(
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

const fetchMovieBySearch = createAsyncThunk<MovieData, string>(
  "movies/Search",
  async search => {
    const response = await getTitleMovieSearch(search)
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

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    // data: null as MoviesData | null,
    data: null as Movie[] | null,
    selectedMovie: null as MovieData | null,
    saearchMovie: null as MovieData | null,
    loading: true,
    topLists: null as TopListMovieResponse | null,
    error: null as string | null,
    vibe: null as VibeMoviesData | null,
    title: null as TitleData | null,
    gallery: null as GalleryData | null,
  },
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setSelectedMovie(state, action: PayloadAction<MovieData | null>) {
      state.selectedMovie = action.payload
    },
    setVibeMovie(state, action: PayloadAction<VibeMoviesData | null>) {
      state.vibe = action.payload ? action.payload : null
    },
    setGalleryMovie(state, action: PayloadAction<GalleryData | null>) {
      state.gallery = action.payload ? action.payload : null
    },
    setAllTitle(state, action: PayloadAction<TitleData | null>) {
      state.title = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovieBySearch.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchMovieBySearch.fulfilled,
        (state, action: PayloadAction<MovieData>) => {
          state.loading = false
          state.saearchMovie = action.payload
        },
      )
      .addCase(fetchMovieBySearch.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to load movie by ID"
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
          state.selectedMovie = state.vibe.content[0] as unknown as MovieData
          state.error = null
        },
      )
      .addCase(fetchMoviesByVibe.rejected, (state, action) => {
        const payload = action.payload as string[] | undefined
        state.loading = false
        state.error = payload?.join("\n") || "Failed to load movies by vibe"
        state.vibe = null
      })

      .addCase(fetchTopListMovies.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTopListMovies.fulfilled, (state, action) => {
        state.loading = false
        state.topLists = action.payload
      })
      .addCase(fetchTopListMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Unknown error occurred"
        state.topLists = null
      })

      .addCase(fetchMoviesGllery.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchMoviesGllery.fulfilled,
        (state, action: PayloadAction<GalleryData>) => {
          state.loading = false
          state.gallery = action.payload
        },
      )
      .addCase(fetchMoviesGllery.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to load movies"
      })

      .addCase(fetchMoviesPoster.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchMoviesPoster.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.loading = false
          state.data = action.payload
        },
      )
      .addCase(fetchMoviesPoster.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to load movies"
        // state.data = null
      })

      .addCase(fetchMoviesAllTitle.pending, state => {
        // state.loading = true
        state.error = null
      })
      .addCase(
        fetchMoviesAllTitle.fulfilled,
        (state, action: PayloadAction<TitleData>) => {
          state.loading = false
          state.title = action.payload
          sessionStorage.setItem("titleAll", JSON.stringify(action.payload))
        },
      )
      .addCase(fetchMoviesAllTitle.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to load movies"
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
  fetchMoviesAllTitle,
  fetchMoviesGllery,
  fetchTopListMovies,
  fetchMovieBySearch,
}

export const {
  setLoading,
  setSelectedMovie,
  setVibeMovie,
  setGalleryMovie,
  setAllTitle,
} = moviesSlice.actions
