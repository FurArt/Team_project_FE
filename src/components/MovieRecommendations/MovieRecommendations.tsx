import React, { useEffect, useState } from "react"
import Typography from "@mui/material/Typography"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import "./MovieRecommendations.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { PaginationItem } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { main } from "framer-motion/client"
import { scrollToHandler } from "../../utils/scrollToHandler"
import { MovieData } from "../../types/movie"
import { fetchMovieById, handleSelectMovie } from "../../app/store"

const itemsPerPage = 8

const MovieRecommendations: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()


  const { vibe } = useAppSelector(
    (state) => state.movies
  );
  const content = vibe?.content

  const handlerBack = () => {
    navigate(-1)
  }

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    dispatch(fetchMovieById(id))

    dispatch(handleSelectMovie(e, id, navigate))
  }

  const displayedMovies = content?.slice(0, itemsPerPage)
  // console.log(displayedMovies[0]);


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
        <p className="movie-recommendations-offers" >Muvio offers the following movies for you to watch</p>
        <div className="movies-container">
          {displayedMovies?.map((movie) => {
            const { posterPath, title, rating, genres, duration, id } = movie
            return (
              <div key={id} className="movie-card"
                onClick={e => handleClick(e, id)}
              >
                <img src={posterPath} alt={title} />
                <div className="movie-info">
                  <h3>{title}</h3>
                  <span className="rating">{rating.toFixed(1)}/10</span>
                </div>
                <p>
                  {`${Array.isArray(genres)
                    ? genres.map(g => g).slice(0, 3).join(" / ")
                    : "Unknown Genre"} ‧ ${duration}`}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default MovieRecommendations
