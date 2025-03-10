import React, { useState } from "react"
import Typography from "@mui/material/Typography"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import "./GalleryPage.scss"
import { useAppSelector } from "../../app/hooks"
import { PaginationItem } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { main } from "framer-motion/client"
import { scrollToHandler } from "../../utils/scrollToHandler"
import { Input } from "@base-ui-components/react"
import DinamicSelect from "../Picker/DinamicSelect"
import { MovieTypeOptions, ReleaseYearOptions } from "../Picker"
import { MovieData } from "../../types/movie"

const itemsPerPage = 6
const NextText = () => (
  <>
    <Typography>Next</Typography>
  </>
)

const GalleryPage: React.FC = () => {
  const navigate = useNavigate()

  const { data: movies, loading, error } = useAppSelector(state => state.movies)
  const [search, setSearch] = useState("")
  const [searchMovies, setSearchMovies] = useState<MovieData[] | null>(null)

  const [page, setPage] = useState(1)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  const startIndex = (page - 1) * itemsPerPage

  // const displayedMovies = movies.slice(startIndex, startIndex + itemsPerPage)
  const displayedMovies = (searchMovies !== null ? searchMovies : movies).slice(
    startIndex,
    startIndex + itemsPerPage,
  )

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleYearChange = () => {}
  const handleTypeChange = () => {}

  const handleEndSearch = () => {
    if (!search.trim()) {
      console.log(movies)
      setSearchMovies(null)
    } else {
      const filteredMovies: MovieData[] | null = movies?.filter(movie =>
        movie.title.toLowerCase().includes(search.toLowerCase()),
      )

      setSearchMovies(filteredMovies)
      setPage(1)
    }
  }

  const getPageCount = (
    movies: MovieData[],
    searchMovies: MovieData[] | null,
    itemsPerPage: number,
  ): number => {
    const totalItems =
      searchMovies && searchMovies.length > 0
        ? searchMovies.length
        : movies.length
    return Math.ceil(totalItems / itemsPerPage)
  }

  return (
    <main>
      <div className="gallery-header  ">
        <div className="gallery-header-background">
          <h1 className="gallery-header-title">GALLERY</h1>
          <p className="gallery-header-description">
            Welcome to the Movio Library collection of films tailored to your
            preferences.
          </p>
          <div className="gallery-header-search">
            <Input
              placeholder="Search"
              value={search}
              onChange={handleSearchChange}
              onKeyUp={e => {
                if (e.key === "Enter") {
                  handleEndSearch()
                }
              }}
              className="gallery-header-search-input"
              data-filled={search ? "true" : undefined}
              render={(props, state) => (
                <div className="input-wrapper">
                  <input {...props} className="gallery-header-search-input" />
                  <span
                    className="gallery-header-search-icon"
                    onClick={handleEndSearch}
                  ></span>
                </div>
              )}
            />
          </div>
        </div>
      </div>
      <div className="conteiner">
        <div className="gallery-page">
          <div className="gallery-page--filters">
            <label>
              Release year
              <DinamicSelect
                defaultValue="2023"
                placeholder="Select a year"
                options={ReleaseYearOptions}
                onValueChange={handleYearChange}
              />
            </label>
            <label>
              Types
              <DinamicSelect
                defaultValue="action"
                placeholder="Select a movie type"
                options={MovieTypeOptions}
                onValueChange={handleTypeChange}
              />
            </label>
          </div>
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
                    {`${
                      Array.isArray(genresDto)
                        ? genresDto
                            .map(g => g)
                            .slice(0, 2)
                            .join(" / ")
                        : "Unknown Genre"
                    } ‧ ${duration}`}
                  </p>
                </div>
              )
            })}
          </div>
          <Stack spacing={2} className="pagination">
            <Pagination
              count={getPageCount(movies, searchMovies, itemsPerPage)}
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
      </div>
    </main>
  )
}

export default GalleryPage
