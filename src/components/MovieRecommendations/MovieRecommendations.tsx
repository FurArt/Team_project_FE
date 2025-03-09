import React, { useState } from "react"
import Typography from "@mui/material/Typography"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import "./MovieRecommendations.scss"
import { useAppSelector } from "../../app/hooks"
import { PaginationItem } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { main } from "framer-motion/client"
import { scrollToHandler } from "../../utils/scrollToHandler"
import { MovieData } from "../../types/movie"

const itemsPerPage = 6
const NextText = () => (
  <>
    <Typography>Next</Typography>
  </>
)

const MovieRecommendations: React.FC = () => {
  const navigate = useNavigate()

  const { data: movies, loading, error } = useAppSelector(
    (state) => state.movies as { data: MovieData[]; loading: boolean; error: string | null }
  );

  const [page, setPage] = useState(1)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handlerBack = () => {
    navigate(-1)
  }

  const startIndex = (page - 1) * itemsPerPage
  const displayedMovies = movies.slice(0, itemsPerPage)

  return (
    <section className="conteiner">
      <div className="movie-recommendations">
        <a
          href="#"
          className="movie-recommendations-link"
          onClick={handlerBack}
        >
          ← BACK
        </a>
        <h2>LIST OF RECOMMENDATIONS FOR YOU</h2>
        <p>Muvio offers the following movies for you to watch</p>
        <div className="movies-container">
          {displayedMovies.map((movie, index) => {
            const { posterPath, title, rating, genresDto, duration } = movie
            return (
              <div key={index} className="movie-card">
                <img src={posterPath} alt={title} />
                <div className="movie-info">
                  <h3>{title}</h3>
                  <span className="rating">{rating.toFixed(1)}/10</span>
                </div>
                <p>
                  {`${Array.isArray(genresDto)
                    ? genresDto.map(g => g).slice(0, 3).join(" / ")
                    : "Unknown Genre"} ‧ ${duration}`}
                </p>
              </div>
            )
          })}
        </div>
        {/* <Stack spacing={2} className="pagination">
          <Pagination
            count={Math.ceil(movies.length / itemsPerPage)}
            page={page}
            onChange={handleChange}
            onClick={scrollToHandler}
            hideNextButton={false}
            shape="rounded"
            showLastButton
            renderItem={item => (
              <PaginationItem slots={{ next: NextText }} {...item} />
            )}
          />
        </Stack> */}
      </div>
    </section>
  )
}

export default MovieRecommendations
