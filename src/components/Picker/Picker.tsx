import { Select } from "@base-ui-components/react/select"

import { getMovies } from "../../api/movie"
import "./Picker.scss"
import DinamicSelect from "./DinamicSelect"
import CheckboxMap from "./CheckboxMap"
import { ReactElement, ReactEventHandler, useState } from "react"
import { scrollToHandler } from "../../utils/scrollToHandler"
import { useNavigate } from "react-router-dom"
import { RoutesPath } from "../../utils/enumRouts"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { generateRandomNumber } from "../../app/randomNumbersSlice"
import { fetchMoviesByVibe } from "../../app/store"
import { CategoryTypes, MediaTypes, VibeTypes } from "../../types/vibe"
import classNames from "classnames"

export const Vibes = [
  { label: "make me chill", value: VibeTypes.MAKE_ME_CHILL },
  { label: "scary me silly", value: VibeTypes.SCARY_ME_SILLY },
  { label: "make me feel good", value: VibeTypes.MAKE_ME_FEEL_GOOD },
  { label: "make me dream", value: VibeTypes.MAKE_ME_DREAM },
  { label: "make me curious", value: VibeTypes.MAKE_ME_CURIOUS },
  {
    label: "take me to another world",
    value: VibeTypes.TAKE_ME_TO_ANOTHER_WORLD,
  },
  { label: "blow my mind", value: VibeTypes.BLOW_MY_MIND },
  { label: "keep me on edge", value: VibeTypes.KEEP_ME_ON_EDGE },
]

export const MovieTypeOptions = [
  { value: "tv_shows", label: "TV Shows" },
  { value: "movies", label: "Movies" },
  { value: "shorts", label: "Shorts" },
  { value: "", label: "Select a movie type" },
  // { value: "no_matter", label: "No matter" },
]
export const ReleaseYearOptions = [
  { value: "2020-2025", label: "2020-2025" },
  { value: "2014-2019", label: "2014-2019" },
  { value: "2008-2013", label: "2008-2013" },
  { value: "2002-2007", label: "2002-2007" },
  { value: "1996-2001", label: "1996-2001" },
  { value: "1990-1995", label: "1990-1995" },
  // { value: "no_matter", label: "No matter" },
  { value: "", label: "Select a year" },
]

const Picker = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { data, vibe, selectedMovie } = useAppSelector(state => state.movies)
  // const { contents } = useAppSelectoбr(state => state.vibe)

  const [filters, setFilters] = useState({
    vibe: "",
    years: "",
    type: "",
    categories: [] as string[],
  })

  // const MovieTypeOptions = [
  //   { value: "tv_shows", label: "TV Shows" },
  //   { value: "movies", label: "Movies" },
  //   { value: "shorts", label: "Shorts" },
  //   { value: "no_matter", label: "No matter" },
  // ]

  const [movieCategories, setMovieCategories] = useState([
    {
      label: "Movies based on a true story",
      checked: false,
      value: "MOVIES_BASED_ON_A_TRUE_STORY",
    },
    {
      label: "Movies based on a book",
      checked: false,
      value: "MOVIES_BASED_ON_A_BOOK",
    },
    {
      label: "Must watch list",
      checked: false,
      value: "MUST_WATCH_LIST",
    },
    {
      label: "Girl Power movies",
      checked: false,
      value: "GIRL_POWER_MOVIES",
    },
    {
      label: "Life-changing movies",
      checked: false,
      value: "LIFE_CHANGING_MOVIES",
    },
    {
      label: "IMDB Top 250 movies",
      checked: false,
      value: "IMD_TOP_250_MOVIES",
    },
  ])

  // const handleYearChange = (value: string) => {
  //   // console.log("Selected Year:", value)
  // }

  // const handleTypeChange = (value: string) => {
  //   // console.log("Selected Movie Type:", value)
  // }

  const handleYearChange = (value: string) => {
    setFilters(prev => ({ ...prev, years: value }))
  }

  const handleTypeChange = (value: string) => {
    setFilters(prev => ({ ...prev, type: value }))
  }

  const handleVibeClick = (vibe: string) => {
    setFilters(prev => ({ ...prev, vibe }))
  }

  const handleCategoryChange = (updatedCategories: typeof movieCategories) => {
    setMovieCategories(updatedCategories)

    const selectedCategories = updatedCategories
      .filter(cat => cat.checked)
      .map(cat => cat.label.toUpperCase().replace(/\s|&/g, "_"))

    setFilters(prev => ({ ...prev, categories: selectedCategories }))
  }

  // const handleVibeClick = (vibe: string) => {
  //   console.log(`You selected: ${vibe}`)
  // dispatch(fetchMoviesByVibe({
  //   data:
  //    {vibe: vibe as VibeTypes,
  //   type: "movie" as MediaTypes,}
  // }))
  // }

  const handleLuckClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // console.log(filters.categories.join(','))
    console.log(filters.type)

    dispatch(
      fetchMoviesByVibe({
        data: {
          vibe: filters.vibe as VibeTypes,
          type: filters.type as MediaTypes,
          years: filters.years,
          categories: filters?.categories,
        },
      }),
    ).finally(() => {
      
      navigate(`../movie`)
    })

    scrollToHandler(e)
  }

  return (
    <>
      <section className="picker" id="picker">
        <h1 className="picker-head">Let’s pick a film for you</h1>
        <p className="picker-title">
          Unleash your desires-get recommendations!
        </p>
        <div className="movie-picker">
          <a href="#" className="movie-picker--close-link"></a>
          <h2 className="movie-picker--title">
            What vibe are you looking for?
          </h2>
          <div className="movie-picker--vibe">
            {Vibes.map((vibe, index) => (
              <button
                key={index}
                // className="movie-picker--vibe-btn"
                className={classNames("movie-picker--vibe-btn", {
                  "active-vibe": filters.vibe === vibe.value,
                })}
                onClick={() => handleVibeClick(vibe.value)}
              >
                {vibe.label}
              </button>
            ))}
          </div>
          <div className="movie-picker--filters">
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
          <p className="movie-picker--subtext">
            Additional preferences <br />
            <span className="movie-picker--info">
              Multiple answers are available
            </span>
          </p>
          <div className="movie-picker--preferences">
            <CheckboxMap
              categories={movieCategories}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          <button
            className="movie-picker--btn movie-picker--btn-primary"
            onClick={e => handleLuckClick(e)}
          >
            PICK MY FILM
          </button>
          <button className="movie-picker--btn movie-picker--btn-secondary">
            PUSH THE LUCK
          </button>
        </div>
        <a
          href="#/picker/"
          className="picker-link"
          onClick={scrollToHandler}
        ></a>
      </section>
    </>
  )
}

export default Picker
