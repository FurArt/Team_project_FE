import React, { useCallback, useEffect, useRef, useState } from "react"
import Typography from "@mui/material/Typography"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import "./GalleryPage.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { debounce, PaginationItem } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import { main } from "framer-motion/client"
import { scrollToHandler } from "../../utils/scrollToHandler"
import { Input } from "@base-ui-components/react"
import DinamicSelect from "../Picker/DinamicSelect"
import { MovieTypeOptions, ReleaseYearOptions } from "../Picker"
import { Movie, MovieData } from "../../types/movie"
import { fetchMoviesGllery, handleSelectMovie } from "../../app/store"
import {
  ContentGallery,
  FiltersOptions,
  GalleryData,
} from "../../types/gallery"
import DinamicSort from "./DinamicSort"

const itemsPerPage = 12
const NextText = () => (
  <>
    <Typography>Next</Typography>
  </>
)
const sortOptions = [
  { value: '1', label: "Newest" },
  { value: '0', label: "Oldest" },
  { value: '2', label: "Sort" },

]

const GalleryPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const firstRenderRef = useRef(true)

  const dispatch = useAppDispatch()

  const { data: loading, error } = useAppSelector(state => state.movies)
  const { gallery } = useAppSelector(state => state.movies)
  const movies = gallery?.content

  const [selectedYear, setSelectedYear] = useState<FiltersOptions | null>(null)
  const [selectedType, setSelectedType] = useState<FiltersOptions | null>(null)
  const [selectedSort, setSelectedSort] = useState<FiltersOptions | null>({ value: '2', label: "Sort" })

  const debouncedFetch = useCallback(
    debounce((year: string = "", type: string = "") => {
      dispatch(fetchMoviesGllery({ size: 1000, years: year, type }))
    }, 500),
    [dispatch],
  )

  const setOption = (
    value: string,
    setArray: {
      value: string
      label: string
    }[],
  ) => {
    const result = setArray?.find(opt => opt.value === value)
    return result || null
  }

  const [search, setSearch] = useState("")
  const [searchMovies, setSearchMovies] = useState<ContentGallery[] | null>(
    null,
  )

  const [page, setPage] = useState(1)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  const startIndex = (page - 1) * itemsPerPage

  useEffect(() => {
  })

  const displayedMovies = (searchMovies ?? movies ?? []).slice(
    startIndex,
    startIndex + itemsPerPage,
  )

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleClick = (e: React.MouseEvent, id: string) => {
    dispatch(handleSelectMovie(e, id, navigate))
  }

  const handleYearChange = (value: string) => {
    const setYear = setOption(value, ReleaseYearOptions)
    if (setYear) {
      setSelectedYear(setYear)
    }
  }

  const handleTypeChange = (value: string) => {
    const setType = setOption(value, MovieTypeOptions)

    if (setType) {
      setSelectedType(setType)
    }
  }

  const handleSortChange = (value: string) => {
    const selected = setOption(value, sortOptions); 
  
    if (selected) {
      setSelectedSort(selected); 
  
      const sorted = [...(searchMovies ?? movies ?? [])];
  
      if (value === '1') {
        sorted.sort((a, b) => b?.releaseYear - a?.releaseYear);
      } else if (value === '0') {
        sorted.sort((a, b) => a?.releaseYear - b?.releaseYear);
      }
  
      setSearchMovies(sorted); 
    }
  };
  

  const handleEndSearch = () => {
    if (!search.trim()) {
      setSearchMovies(null)
    } else {
      const filteredMovies: ContentGallery[] | undefined = movies?.filter(
        movie => movie?.title.toLowerCase().includes(search.toLowerCase()),
      )
      if (!filteredMovies) {
        setSearchMovies(null)
      } else {
        setSearchMovies(filteredMovies)
        setPage(1)
      }
    }
  }
  const handleSendFiltering = () => {
    if (!selectedType?.value) {
      debouncedFetch(selectedYear?.value, "")
      navigate(`/gallery?type=&year=${selectedYear?.value}`)
      return
    }
    if (!selectedYear?.value) {
      debouncedFetch("", selectedType?.value)
      navigate(`/gallery?type=${selectedType?.value}&year=`)
      return
    }
    debouncedFetch(selectedYear?.value, selectedType?.value)
    navigate(`/gallery?type=${selectedType?.value}&year=${selectedYear?.value}`)
  }

  const getPageCount = (
    movies: ContentGallery[] | undefined,
    searchMovies: ContentGallery[] | null,
    itemsPerPage: number,
  ): number => {
    const totalItems =
      searchMovies && searchMovies.length > 0
        ? searchMovies.length
        : (movies?.length ?? 0)
    return Math.ceil(totalItems / itemsPerPage)
  }

  useEffect(() => {
    scrollToHandler(null)
  }, [page])

  useEffect(() => {
    if (!selectedYear?.value || !selectedType?.value) {
      return
    }
  }, [selectedYear?.value, selectedType?.value, debouncedFetch])

  useEffect(() => {
    if (!firstRenderRef.current) return
    const params = new URLSearchParams(location.search)
    const year = params.get("year") || ""
    const type = params.get("type") || ""
    setSelectedYear(setOption(year, ReleaseYearOptions))
    setSelectedType(setOption(type, MovieTypeOptions))
  }, [])

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
                defaultValue={selectedYear?.value}
                placeholder={selectedYear?.label || `Select a year`}
                options={ReleaseYearOptions}
                onValueChange={handleYearChange}
              />
            </label>
            <label>
              Types
              <DinamicSelect
                defaultValue={selectedType?.value}
                placeholder={selectedType?.label || `Select a movie type`}
                options={MovieTypeOptions}
                onValueChange={handleTypeChange}
                
              />
            </label>
            <label>
              Sort by
              <DinamicSort
                defaultValue={selectedSort?.value}
                placeholder={selectedSort?.label || `Sort`}
                options={sortOptions}
                onValueChange={handleSortChange}
              />
            </label>

            <button
              className="gallery-page--btn gallery-page--btn-primary"
              onClick={handleSendFiltering}
            >
              Apply now
            </button>
          </div>
          <div className="movies-container">
            {displayedMovies.map((movie, index) => {
              const { posterPath, title, rating, genres, duration, id } = movie
              return (
                <div
                  key={index}
                  className="movie-card"
                  onClick={e => handleClick(e, id)}
                >
                  <img src={posterPath} alt={title} />
                  <div className="movie-info">
                    <h3>{title}</h3>
                    <span className="rating">{rating.toFixed(1)}/10</span>
                  </div>
                  <p>
                    {`${
                      Array.isArray(genres)
                        ? genres
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
          {
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
          }
        </div>
      </div>
    </main>
  )
}

export default GalleryPage
