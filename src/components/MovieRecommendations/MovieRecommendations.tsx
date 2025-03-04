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

const itemsPerPage = 6
const NextText = () => (
  <>
    <Typography>Next</Typography>
  </>
)

const MovieRecommendations: React.FC = () => {
  const navigate = useNavigate()

  const { data: movies, loading, error } = useAppSelector(state => state.movies)

  const [page, setPage] = useState(1)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handlerBack = () => {
    navigate(-1)
  }

  const startIndex = (page - 1) * itemsPerPage
  const displayedMovies = movies.slice(startIndex, startIndex + itemsPerPage)

  return (
    <main className="conteiner">
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
            const { posterPath, name, rating, genres } = movie
            return (
              <div key={index} className="movie-card">
                <img src={posterPath} alt={name} />
                <div className="movie-info">
                  <h3>{name}</h3>
                  <span className="rating">{rating.toFixed(1)}/10</span>
                </div>
                  <p>
                    {Array.isArray(genres)
                      ? genres.map(g => g.name).join(" / ")
                      : "Unknown Genre"}
                  </p>
              </div>
            )
          })}
        </div>
        <Stack spacing={2} className="pagination">
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
        </Stack>
      </div>
    </main>
  )
}

export default MovieRecommendations
