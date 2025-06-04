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
  const params = new URLSearchParams(location.search)
  const year = params.get("year") || ""
  const type = params.get("type") || ""
  const searchUrl = params.get("search")

  const dispatch = useAppDispatch()

  const { data: loading, error } = useAppSelector(state => state.movies)
  const { gallery } = useAppSelector(state => state.movies)
  const movies = gallery?.content
  const [searchMovieByTitle, setSearchMovieByTitle] = useState<string | null>(null)

  const [selectedYear, setSelectedYear] = useState<FiltersOptions | null>(null)
  const [selectedType, setSelectedType] = useState<FiltersOptions | null>(null)
  const [selectedSort, setSelectedSort] = useState<FiltersOptions | null>(null)

  const debouncedFetch = useCallback(
    debounce((year: string = "", type: string = "", title: string = "", sort: string) => {
      dispatch(fetchMoviesGllery({ size: 1000, years: year, type, title, sort: [sort] }))
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

  const [search, setSearch] = useState(params.get("search") || "")
  const [searchMovies, setSearchMovies] = useState<ContentGallery[] | null>(
    null,
  )

  const [page, setPage] = useState(1)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  const startIndex = (page - 1) * itemsPerPage



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
  const handleSortChange = (valueData: string) => {
    const selected = setOption(valueData, sortOptions);
    if (!selected) return;
    setSelectedSort(selected);
  };


  const handleEndSearch = () => {
    if (!search.trim()) {
      setSearchMovies(null)
    }
    const searchTitle = search.toLowerCase()
    debouncedFetch('', '', searchTitle, '',)
    navigate(`/gallery?search=${searchTitle}&type=&year=`)
  }

  const handleSendFiltering = () => {
    let sortQuery = ""

    if (selectedSort?.value === '1') {
      sortQuery = "releaseYear,desc"
    } else if (selectedSort?.value === '0') {
      sortQuery = "releaseYear,asc"
    }
    console.log(`sortQuery`);
    console.log(sortQuery);


    if (!selectedType?.value) {
      debouncedFetch(selectedYear?.value, "", "", sortQuery)
      navigate(`/gallery?type=&year=${selectedYear?.value}${sortQuery ? `&sort=${sortQuery}` : ""}`)
      return
    }

    if (!selectedYear?.value) {
      debouncedFetch("", selectedType?.value, "", sortQuery)
      navigate(`/gallery?type=${selectedType?.value}&year=${""}${sortQuery ? `&sort=${sortQuery}` : ""}`)
      return
    }

    debouncedFetch(selectedYear?.value, selectedType?.value, "", sortQuery)
    navigate(`/gallery?type=${selectedType?.value}&year=${selectedYear?.value}${sortQuery ? `&sort=${sortQuery}` : ""}`)
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
    console.log(firstRenderRef.current);

    if (!firstRenderRef.current) return


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
              <span className="label-sort-text">Sort by</span>
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


            {displayedMovies.length === 0 ? (
              <div className="gallery-header-description">
                {`Can't find ${searchUrl}`}
              </div>
            )
              : displayedMovies.map((movie, index) => {
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
                      {`${Array.isArray(genres)
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
          {(displayedMovies.length < 8
          ) ? null : (
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
            </Stack>)
          }
        </div>
      </div>
    </main>
  )
}

export default GalleryPage
