import "./features/styles/_variables.scss"
import "./features/styles/App.scss"
import "./features/styles/index.scss"
import "./features/styles/reset.scss"

import Header from "./components/Header/Header"
import Wrapper from "./components/Wrapper/Wrapper"
import Footer from "./components/Footer/Footer"
import { Route, Routes } from "react-router"
import NotFound from "./components/NotFound/NotFound"
import Picker from "./components/Picker/Picker"
import Stats from "./components/Stats/Stats"
import Mood from "./components/Mood/Mood"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { fetchMoviesStore } from "./app/store"
import Movie from "./components/Movie/Movie"
import Loading from "./components/Loading/Loading"

const App = () => {
  const dispatch = useAppDispatch()
  const { data: movies, loading, error } = useAppSelector(state => state.movies)

  useEffect(() => {
    dispatch(fetchMoviesStore())
  }, [dispatch])
  useEffect(() => {
    console.log(movies?.[0])
    console.log(loading);

  })
  return (
    <>
      <Header />
      {loading ? <Loading /> : (<Routes>
        <Route
          path="/"
          element={
            <Wrapper>
              <Stats />
            </Wrapper>
          }
        >
          <Route index element={<Mood />} />
          <Route path="picker" element={<Picker />} />
        </Route>
        <Route path="movie" element={<Movie />} />
        <Route path="*" element={<NotFound />} />

      </Routes>)}
      <div></div>
      <Footer />
    </>
  )
}

export default App
