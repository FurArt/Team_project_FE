import { useCallback, useEffect } from "react"
import { useAppDispatch } from "@/store"
import {
  fetchTopListMovies,
  fetchMoviesGllery,
  fetchMovieById,
  fetchMoviesPoster,
  setSelectedMovie,
  setVibeMovie,
  setLoading,
} from "@/store/actions" // adjust paths
import { useLocation, useSearchParams, useParams } from "react-router-dom"
import { wait } from "@/utils" // assuming your wait function is custom

const usePageEffects = ({
  isMovieLoaded,
  idMovie,
  loading,
  moviesLoading,
}: {
  isMovieLoaded: boolean
  idMovie?: string
  loading: boolean
  moviesLoading: boolean
}) => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const params = useSearchParams()[0]

  const handleTopList = useCallback(() => {
    const id = params.get("id") as TopListTypes
    dispatch(fetchTopListMovies({ listType: id, size: 100 }))
  }, [dispatch, params])

  const handleGallery = useCallback(() => {
    const year = params.get("year") || ""
    const type = params.get("type") || ""
    const search = params.get("search") || ""
    dispatch(fetchMoviesGllery({ title: search, years: year, type }))
  }, [dispatch, params])

  const handleMoviePage = useCallback(() => {
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
  }, [dispatch, isMovieLoaded, idMovie])

  const handleRecommendations = useCallback(() => {
    const storedContent = sessionStorage.getItem("vibeData")
    const initialContent = storedContent
      ? (JSON.parse(storedContent) as VibeMoviesData)
      : null
    dispatch(setVibeMovie(initialContent))
  }, [dispatch])

  const handleMainPage = useCallback(() => {
    dispatch(fetchMoviesPoster())
  }, [dispatch])

  useEffect(() => {
    if (moviesLoading) return

    switch (location.pathname) {
      case "/show-top-lists":
        handleTopList()
        break
      case "/gallery":
        handleGallery()
        break
      case "/recommendations":
        handleRecommendations()
        break
      case "/":
        handleMainPage()
        break
      default:
        if (location.pathname.startsWith("/movie")) {
          handleMoviePage()
        }
        break
    }

    wait(700).then(() => {
      if (loading) dispatch(setLoading(false))
    })
  }, [
    location.pathname,
    moviesLoading,
    loading,
    handleTopList,
    handleGallery,
    handleMoviePage,
    handleRecommendations,
    handleMainPage,
    dispatch,
  ])
}
