import { useEffect } from "react"
import { useAppSelector } from "../../app/hooks"
import "./Movie.scss"
import GalleryComponent from "./Gallery/GalleryComponent"

type Genre = {
  id: string
  name: string
}

const Movie = () => {
  const { data: movies, loading, error } = useAppSelector(state => state.movies)
  const posterPath = movies?.[0]?.posterPath
  const nameMovie = movies?.[0]?.name
  const imDB = movies?.[0]?.rating

  const arryGenres: Genre[] = movies?.[0]?.genres
  useEffect(() => {
    console.log(arryGenres)
  }, [movies])

  return loading ? null : (
    <div className="movie">
      <div className="movie-content">
        <div className="movie-header">
          <a href="#" className="movie-link" onClick={e => e.preventDefault()}>
            ← BACK
          </a>
          <h1 className="movie-page-title">Film for you</h1>
        </div>
        <div className="movie-info">
          <div className="movie-poster">
            <img src={posterPath} alt={nameMovie} />
          </div>
          <div className="movie-container">
            <div className="movie-details">
              <h1 className="movie-title item-1">
                {nameMovie} (need YEAR FROM DATA)
              </h1>
              <p className="movie-description item-2">
                (NEED DISCRIPTON FROM DATA) Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Animi saepe consequuntur
                provident iure distinctio eligendi nesciunt odit quaerat quis
                accusantium cupiditate, voluptas, totam quidem, veritatis
                reiciendis numquam. Libero, aliquam eveniet!
              </p>

              <div className="movie-tags item-3">
                {arryGenres?.map(genre => (
                  <span key={genre.id} className="movie-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="movie-meta">
              <div className="movie-meta-item">
                <strong>Director:</strong>
                <br />
                TODO NEED DATA FROM SERVER
              </div>
              <div className="movie-meta-item">
                <strong>Duration:</strong>
                <br />
                TODO NEED DATA FROM SERVER
              </div>
              <div className="movie-meta-item">
                <strong>IMDB Rating:</strong>
                <br />
                {imDB}
              </div>
            </div>
            <button className="movie-button">
              <span>WATCH TRAILER</span>
            </button>
          </div>
        </div>
      </div>

      <div className="movie-photos">
        <div className="movie-row">
          <h2 className="movie-section-title">Photos  todo Need data from server</h2>
          <a href="#" className="movie-link" onClick={e => e.preventDefault()}>
            VIEW ALL
          </a>
        </div>
        <GalleryComponent />
      </div>

      <div className="movie-cast">
      <div className="movie-row">
        <h2 className="movie-section-title">Top Cast TODO NEED DATA FROM SERVER</h2>
        <a href="#" className="movie-link" onClick={e => e.preventDefault()}>
            VIEW ALL
          </a>
      </div>

        <div className="movie-cast-list">
          {[
            {
              name: "TODO NEED DATA FROM SERVER",
              role: "",
              img: "JPG.jpg",
            },
            { name: "Rachel Weisz", role: "Tessa Quayle", img: "rachel.jpg" },
          ].map((actor, index) => (
            <div key={index} className="movie-cast-item">
              <img
                src={actor.img}
                alt={actor.name}
                className="movie-cast-photo"
              />
              <span className="movie-cast-name">{actor.name}</span>
              <span className="movie-cast-role">{actor.role}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="movie-reviews">
        <h2 className="movie-section-title">User Reviews</h2>
        <div className="movie-review">
          <h3 className="movie-review-title">"TODO NEED DATA FROM SERVER"</h3>
          <p className="movie-review-text">
            If you want to see a movie that makes you think, this is it. The
            story is compelling, and the cinematography is fantastic.
          </p>
        </div>
      </div>

      <div className="movie-actions">
        <button className="movie-button movie-button--secondary">
          EXPLORE LIST RECOMMENDATION
        </button>
        <button className="movie-button movie-button--secondary">
          GET ANOTHER RECOMMENDATION
        </button>
        <button className="movie-button movie-button--primary">
          FIND THE WAY TO WATCH
        </button>
      </div>
    </div>
  )
}

export default Movie
