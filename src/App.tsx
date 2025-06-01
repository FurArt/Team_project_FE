import "./features/styles/_variables.scss"
import "./features/styles/App.scss"
import "./features/styles/index.scss"
import "./features/styles/reset.scss"

import Header from "./components/Header/Header"
import Wrapper from "./components/Wrapper/Wrapper"
import Footer from "./components/Footer/Footer"
import { Route, Routes, useLocation, useNavigate } from "react-router"
import NotFound from "./components/NotFound/NotFound"
import Picker from "./components/Picker/Picker"
import Stats from "./components/Stats/Stats"
import Mood from "./components/Mood/Mood"
import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import {
  fetchMovieById,
  fetchMovieBySearch,
  fetchMoviesAllTitle,
  fetchMoviesGllery,
  fetchMoviesPoster,
  fetchTopListMovies,
  setLoading,
  setSelectedMovie,
  setVibeMovie,
} from "./app/store"
import Movie from "./components/Movie/Movie"
import Loading from "./components/Loading/Loading"
import { generateRandomNumber } from "./app/randomNumbersSlice"
import MovieRecommendations from "./components/MovieRecommendations/MovieRecommendations"
import GalleryPage from "./components/GalleryPage/GalleryPage"
import { RoutesPath } from "./utils/enumRouts"
import TopLists from "./components/TopLists/TopLists"
import ShowListTopList from "./components/TopLists/ShowListTopList/ShowListTopList"
import { TopListTypes } from "./types/TopListTypes"
import { VibeMovie, VibeMoviesData } from "./types/vibe"
import { MovieData } from "./types/movie"
import AboutUs from "./components/AboutUs/AboutUs"
import MadeInUkraine from "./components/MadeInUkraine/MadeInUkraine"
import { getTitleMovieSearch } from "./api/movie"

const App = () => {
  const dispatch = useAppDispatch()
  const { movies } = useAppSelector(state => state)
  const location = useLocation()
  const navigate = useNavigate()
  const loading = movies?.loading
  const params = new URLSearchParams(location.search)
  const idMovie = params.get("idMovie")
  const firstRenderRef = useRef(true)
  const [isMovieLoaded, setIsMovieLoaded] = useState<boolean>(
    !!movies.selectedMovie?.id || false,
  )
  const search = params.get("search") || ""

  // useEffect(() => {
  // })

  useEffect(() => {
    if (location.pathname === "/show-top-lists") {
      const id = params.get("id") as TopListTypes
      dispatch(
        fetchTopListMovies({
          listType: id,
          size: 100,
        }),
      )
    }

    if (location.pathname === "/gallery") {
      const params = new URLSearchParams(location.search)
      const year = params.get("year") || ""
      const type = params.get("type") || ""
      const search = params.get("search") || ""
      dispatch(fetchMoviesGllery({ title: search, years: year, type: type }))
    }

    // if (location.pathname === "/") {
    //   dispatch(fetchMoviesPoster())
    // }

    if (location.pathname === "/movie") {
      const storedContent = sessionStorage.getItem("selectedMovie")
      const initialContent = storedContent
        ? (JSON.parse(storedContent) as MovieData)
        : null
      if (initialContent instanceof Object) {
        dispatch(setSelectedMovie(initialContent))
      }

      if (isMovieLoaded && idMovie) {
        dispatch(fetchMovieById(idMovie))
      }
    }

    if (location.pathname === "/recommendations") {
      const storedContent = sessionStorage.getItem("vibeData")
      const initialContent = storedContent
        ? (JSON.parse(storedContent) as VibeMoviesData)
        : null
      dispatch(setVibeMovie(initialContent))
    }

    if (location.pathname === "/") {
      dispatch(fetchMoviesPoster())
    }

  }, [])

  useEffect(() => {
    if (movies.loading) {
      return
    }

    if (location.pathname === "/show-top-lists") {
      const params = new URLSearchParams(location.search)
      const id = params.get("id") as TopListTypes
      dispatch(
        fetchTopListMovies({
          listType: id,
          size: 100,
        }),
      )
    }
    // console.log(location.pathname === "/" && movies.data?.length === 0)

    if (location.pathname === "/" || movies.data?.length === 0) {
      dispatch(fetchMoviesPoster())
    }

    if (location.pathname === "/movie") {
      if (idMovie) {
        if (movies.selectedMovie?.id !== idMovie) {
          dispatch(fetchMovieById(idMovie))
        }
      } else if (movies.selectedMovie?.id) {
        const params = new URLSearchParams()
        params.set("idMovie", String(movies.selectedMovie.id))
        navigate(`/movie?${params.toString()}`, { replace: true })
        console.log(movies.selectedMovie?.id)
      }
    }

    if (location.pathname === "/gallery") {
      console.log(`it too`)
      dispatch(fetchMoviesGllery({ title: search }))
      // dispatch(fetchMoviesGllery({}))
    }

    if (location.pathname === "/recommendations") {
      if (movies.vibe?.content) {
        sessionStorage.setItem("vibeData", JSON.stringify(movies?.vibe))
      }
    }

    if (movies?.selectedMovie) {
      sessionStorage.setItem(
        "selectedMovie",
        JSON.stringify(movies?.selectedMovie),
      )
    }
  }, [location.pathname, movies.selectedMovie])

  useEffect(() => {
    if (location.pathname === "/gallery") {
      console.log(`it too`)
      dispatch(fetchMoviesGllery({ title: search }))
      // dispatch(fetchMoviesGllery({}))
    }
  }, [search])
  return (
    <>
      <Header />
      <MadeInUkraine />
      {/* {true ? ( */}
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route
            path={RoutesPath.HOME}
            element={
              <Wrapper>
                <Stats />
              </Wrapper>
            }
          >
            <Route index element={<Mood />} />
          </Route>
          <Route path={RoutesPath.PICKER} element={<Picker />} />
          <Route path={`${RoutesPath.MOVIE}`} element={<Movie />} />
          <Route path={`${RoutesPath.MOVIE}/:idMovie`} element={<Movie />} />
          <Route
            path={RoutesPath.RECOMMENDATIONS}
            element={<MovieRecommendations />}
          />
          <Route path={RoutesPath.GALLERY} element={<GalleryPage />} />
          <Route path={`${RoutesPath.GALLERY}`} element={<GalleryPage />} />

          <Route path={RoutesPath.TOPLISTS} element={<TopLists />} />
          <Route
            path={`${RoutesPath.SHOWTOPLISTS}`}
            element={<ShowListTopList />}
          />
          <Route
            path={`${RoutesPath.SHOWTOPLISTS}/:id${RoutesPath.SHOWTOPLISTS}`}
            element={<ShowListTopList />}
          />
          <Route path={RoutesPath.ABOUTUS} element={<AboutUs />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      <Footer />
    </>
  )
}

export default App
