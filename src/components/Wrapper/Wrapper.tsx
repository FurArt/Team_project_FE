import { Outlet, useNavigate } from "react-router-dom"
import "./Wrapper.scss"
import { ReactNode, useEffect, useState } from "react"
import MadeInUkraine from "../MadeInUkraine/MadeInUkraine"
import { scrollToHandler } from "../../utils/scrollToHandler"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchMovieById, handleSelectMovie } from "../../app/store"
import { Movie } from "../../types/movie"

interface WrapperProps {
  children?: ReactNode
}


const Wrapper = ({ children }: WrapperProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const moviesData = useAppSelector(state => state.movies.data);
  const content = moviesData?.content || null;

  const [showMovies, setShowMovies] = useState<Movie[]>([]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    console.log(id)
    e.preventDefault()
    dispatch(fetchMovieById(id))

    dispatch(handleSelectMovie(e, id, navigate))
  }

  useEffect(() => {
    console.log(moviesData);
  })

  useEffect(() => {
    if (Array.isArray(content)) {
      setShowMovies(content);
    } else {
      setShowMovies([]);
    }
    console.log(`Movies count: ${content?.length || 0}`);
  }, []);

  return (
    <main className="wrapper">
      <MadeInUkraine />
      <section className="conteiner-video">
        {(showMovies?.length < 70 || showMovies?.length === undefined)
          ? Array.from({ length: 70 }).map((_, index) => (
            <div
              key={index}
              className={`wrapper-img wrapper-img-${index + 1}`}
            />
          ))
          : showMovies
            ?.slice(0, 70)
            .map((movie, index) => (
              <div
                key={index}
                className={`wrapper-img`}
                style={{ backgroundImage: `url(${movie.posterPath})` }}
                onClick={e => handleClick(e, movie.id)}
              ></div>
            ))}
      </section>
      {children}
    </main>
  )
}

export default Wrapper
