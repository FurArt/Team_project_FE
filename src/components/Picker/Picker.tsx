import { Select } from "@base-ui-components/react/select"

import { getMovies } from "../../api/movie"
import "./Picker.scss"
import DinamicSelect from "./DinamicSelect"

const Picker = () => {
  const handleClick = async () => {
    getMovies().then(movies => {
      console.log(movies)
    })
  }

  const handleYearChange = (value:string) => {
    console.log("Selected Year:", value)
  }

  const handleTypeChange = (value:string) => {
    console.log('Selected Movie Type:', value);
  };

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
            <button className="movie-picker--vibe-btn">make me chill</button>
            <button className="movie-picker--vibe-btn">scary me silly</button>
            <button className="movie-picker--vibe-btn">
              make me feel good
            </button>
            <button className="movie-picker--vibe-btn">make me dream</button>
            <button className="movie-picker--vibe-btn">make me curious</button>
            <button className="movie-picker--vibe-btn">
              take me to another world
            </button>
            <button className="movie-picker--vibe-btn">blow my mind</button>
            <button className="movie-picker--vibe-btn">keep me on edge</button>
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
            <label className="movie-picker--checkbox">
              <input type="checkbox" /> Movies based on a true story
            </label>
            <label className="movie-picker--checkbox">
              <input type="checkbox" checked /> Spy movies & Cop movies
            </label>
            <label className="movie-picker--checkbox">
              <input type="checkbox" checked /> Movies based on a book
            </label>
            <label className="movie-picker--checkbox">
              <input type="checkbox" checked /> Must watch list
            </label>
            <label className="movie-picker--checkbox">
              <input type="checkbox" /> Girl Power movies
            </label>
            <label className="movie-picker--checkbox">
              <input type="checkbox" /> Life-changing movies
            </label>
            <label className="movie-picker--checkbox">
              <input type="checkbox" /> Sport-life movies
            </label>
            <label className="movie-picker--checkbox">
              <input type="checkbox" checked /> IMD Top 250 movies
            </label>
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
