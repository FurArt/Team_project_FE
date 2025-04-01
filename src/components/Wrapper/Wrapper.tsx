import { Outlet, useNavigate } from "react-router-dom"
import "./Wrapper.scss"
import { ReactNode, useEffect, useState } from "react"
import MadeInUkraine from "../MadeInUkraine/MadeInUkraine"
import { scrollToHandler } from "../../utils/scrollToHandler"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchMovieById, handleSelectMovie } from "../../app/store"

interface WrapperProps {
  children?: ReactNode
}

interface Movie {
  id: string;
  posterPath: string;
}

interface MoviesState {
  data?: Movie[];
  selectedMovie?: Movie | null;
  loading: boolean;
  error?: string | null;
}


const Wrapper = ({ children }: WrapperProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // const { movies } = useAppSelector(state => state)
  // const { movies }: { movies: MoviesState } = useAppSelector(state => state);
  const movies = useAppSelector(state => state.movies);


  const [showMovies, setShowMovies] = useState<Movie[]>([]);


  const handleClick = (e: React.MouseEvent, id: string) => {
    console.log(id)
    e.preventDefault
    dispatch(fetchMovieById(id))

    dispatch(handleSelectMovie(e, id, navigate))
  }

  useEffect(()=>{
    console.log(movies);
    
  })

  useEffect(() => {
    if (movies?.data && Array.isArray(movies.data.content)) {
      setShowMovies(movies.data.content);
    } else {
      setShowMovies([]); // Ensure it's always an array
    }
    console.log(`Movies count: ${movies?.data?.content?.length || 0}`);
  }, [movies.loading]);

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
      {/* <Outlet /> */}
    </main>
  )
}

export default Wrapper
