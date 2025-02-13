import { Select } from "@base-ui-components/react/select"

import { getMovies } from "../../api/movie"
import "./Picker.scss"
import DinamicSelect from "./DinamicSelect"
import CheckboxMap from "./CheckboxMap"
import { useState } from "react"

const Picker = () => {

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

  const vibes = [
    "make me chill",
    "scary me silly",
    "make me feel good",
    "make me dream",
    "make me curious",
    "take me to another world",
    "blow my mind",
    "keep me on edge",
  ]

  const releaseYearOptions = [
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
  ]

  const movieTypeOptions = [
    { value: "action", label: "Action" },
    { value: "comedy", label: "Comedy" },
    { value: "drama", label: "Drama" },
    { value: "horror", label: "Horror" },
  ]

  

  return (
    <>
      <section className="picker">
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
            {vibes.map((vibe, index) => (
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
                options={releaseYearOptions}
                onValueChange={handleYearChange}
              />
            </label>
            <label>
              Types
              <DinamicSelect
                defaultValue="action"
                placeholder="Select a movie type"
                options={movieTypeOptions}
                onValueChange={handleTypeChange}
              />
            </label>
          </div>
          <p className="movie-picker--subtext">
            Additional preferences{" "}
            <span className="movie-picker--info">
              Multiple answers are available
            </span>
          </p>
          <div className="movie-picker--preferences">
            <CheckboxMap categories={movieCategories} onCategoryChange={setMovieCategories} />
          </div>
          <button className="movie-picker--btn movie-picker--btn-primary">
            PICK MY FILM
          </button>
          <button className="movie-picker--btn movie-picker--btn-secondary">
            PUSH THE LUCK
          </button>
        </div>
      </section>
    </>
  )
}

export default Picker
