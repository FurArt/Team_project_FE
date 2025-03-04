import { Select } from "@base-ui-components/react/select"

import { getMovies } from "../../api/movie"
import "./Picker.scss"
import DinamicSelect from "./DinamicSelect"
import CheckboxMap from "./CheckboxMap"
import { ReactElement, ReactEventHandler, useState } from "react"
import { scrollToHandler } from "../../utils/scrollToHandler"
import { useNavigate } from "react-router-dom"
import { RoutesPath } from "../../utils/enumRouts"

export const Vibes = [
  "make me chill",
  "scary me silly",
  "make me feel good",
  "make me dream",
  "make me curious",
  "take me to another world",
  "blow my mind",
  "keep me on edge",
]

export const MovieTypeOptions = [
  { value: "tv_shows", label: "TV Shows" },
  { value: "movies", label: "Movies" },
  { value: "shorts", label: "Shorts" },
  { value: "no_matter", label: "No matter" },
]
export const ReleaseYearOptions = [
  { value: "2020-2025", label: "2020-2025" },
  { value: "2014-2019", label: "2014-2019" },
  { value: "2008-2013", label: "2008-2013" },
  { value: "2002-2007", label: "2002-2007" },
  { value: "1996-2001", label: "1996-2001" },
  { value: "1990-1995", label: "1990-1995" },
  { value: "no_matter", label: "No matter" },
]

const Picker = () => {
  const navigate = useNavigate()

  const [movieCategories, setMovieCategories] = useState([
    { label: "Movies based on a true story", checked: false },
    { label: "Spy movies & Cop movies", checked: true },
    { label: "Movies based on a book", checked: true },
    { label: "Must watch list", checked: true },
    { label: "Girl Power movies", checked: false },
    { label: "Life-changing movies", checked: false },
    { label: "Sport-life movies", checked: false },
    { label: "IMDB Top 250 movies", checked: true },
  ]);
  
  const handleClick = async () => {
    getMovies().then(movies => {
      console.log(movies)
    })
  }

  const handleYearChange = (value: string) => {
    console.log("Selected Year:", value)
  }

  const handleTypeChange = (value: string) => {
    console.log("Selected Movie Type:", value)
  }

  const handleVibeClick = (vibe: string) => {
    console.log(`You selected: ${vibe}`)
  }

  

  

const handleRecommend = () => {
  navigate(`../${RoutesPath.RECOMMENDATIONS}`)
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
                className="movie-picker--vibe-btn"
                onClick={() => handleVibeClick(vibe)}
              >
                {vibe}
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
            Additional preferences{" "}
            <br />
            <span className="movie-picker--info">
              Multiple answers are available
            </span>
          </p>
          <div className="movie-picker--preferences">
            <CheckboxMap categories={movieCategories} onCategoryChange={setMovieCategories} />
          </div>
          <button
            className="movie-picker--btn movie-picker--btn-primary"
            onClick={handleRecommend}
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
