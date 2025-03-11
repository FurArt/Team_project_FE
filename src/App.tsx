import "./features/styles/_variables.scss"
import "./features/styles/App.scss"
import "./features/styles/index.scss"
import "./features/styles/reset.scss"

import Header from "./components/Header/Header"
import Wrapper from "./components/Wrapper/Wrapper"
import Footer from "./components/Footer/Footer"
import { Route, Routes, useLocation } from "react-router"
import NotFound from "./components/NotFound/NotFound"
import Picker from "./components/Picker/Picker"
import Stats from "./components/Stats/Stats"
import Mood from "./components/Mood/Mood"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { fetchMoviesStore, setLoading } from "./app/store"
import Movie from "./components/Movie/Movie"
import Loading from "./components/Loading/Loading"
import { generateRandomNumber } from "./app/randomNumbersSlice"
import MovieRecommendations from "./components/MovieRecommendations/MovieRecommendations"
import GalleryPage from "./components/GalleryPage/GalleryPage"
import { RoutesPath } from "./utils/enumRouts"
import TopLists from "./components/TopLists/TopLists"
import ShowListTopList from "./components/TopLists/ShowListTopList/ShowListTopList"

const App = () => {
  const dispatch = useAppDispatch()
  const { data: movies, loading, error } = useAppSelector(state => state.movies)
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchMoviesStore(100))
    dispatch(generateRandomNumber(movies.length))

  }, [dispatch])
  useEffect(() => {
    console.log(movies?.[0])
    console.log(loading)
  })

  useEffect(() => {
    let timer: number;
    if (movies?.length) {
      timer = setTimeout(() => {
        dispatch(setLoading(false)); // Stop loading after 2 seconds
      }, 2000);

    }

    return () => clearTimeout(timer); // Clear timer if component unmounts or re-renders
  }, [movies, location]);

  return (
    <>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path={RoutesPath.HOME} element={
            <Wrapper>
              <Stats />
            </Wrapper>
          }>
            <Route index element={<Mood />} />
            <Route path={RoutesPath.PICKER} element={<Picker />} />
          </Route>
          <Route path={`${RoutesPath.MOVIE}`} element={<Movie />} />
          <Route path={`${RoutesPath.MOVIE}/:idMovie`} element={<Movie />} />
          <Route path={RoutesPath.RECOMMENDATIONS} element={<MovieRecommendations />} />
          <Route path={RoutesPath.GALLERY} element={<GalleryPage />} />
          <Route path={RoutesPath.TOPLISTS} element={<TopLists />} />
          <Route path={`${RoutesPath.SHOWTOPLISTS}`} element={<ShowListTopList />} />
          <Route path={`${RoutesPath.SHOWTOPLISTS}/:id${RoutesPath.SHOWTOPLISTS}`} element={<ShowListTopList />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      <Footer />
    </>
  )
}

export default App
