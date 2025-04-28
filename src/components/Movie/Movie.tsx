import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import "./Movie.scss"
import GalleryComponent from "./Gallery/GalleryComponent"
import { castPhotos } from "./Gallery/cast-photos"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Loading from "../Loading/Loading"
import { useSelector } from "react-redux"
import { RootState, setLoading } from "../../app/store"
import { RoutesPath } from "../../utils/enumRouts"
import { MovieData } from "../../types/movie"
import { Avatar } from "@mui/material"
// import { Avatar } from "@base-ui-components/react/avatar"

type Genre = {
  id: string
  name: string
}

const Movie = () => {
  const dispatch = useAppDispatch()
  const { movies } = useAppSelector(state => state)

  useEffect(() => {
    console.log(
      movies

    );
  })

  const usedNumbers = useSelector(
    (state: RootState) => state.randomNumbers.usedNumbers,
  )
  const [numberRandomMovie, setNumberRandomMovie] = useState(usedNumbers[0])
  const [expandedReviewId, setExpandedReviewId] = useState(null);

  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const idMovie = params.get("idMovie")

  const stripHTML = (text: any) => {
    if (typeof text !== "string") return ""
    return text.replace(/<\/?[a-z][\s\S]*?>/gi, "")
  }
  // const movieShow = movies?.[numberRandomMovie] || []

  function isMovieArray(movie: unknown): movie is MovieData[] {
    return Array.isArray(movie) && movie.length > 0;
  }
  
  const movieShow = isMovieArray(movies.selectedMovie)
    ? movies.selectedMovie[0]
    : movies.selectedMovie;

  // const movieShow = movies.selectedMovie

  const {
    actors = [],
    duration = "",
    genres = [],
    id = "",
    keywords = null,
    overview = "",
    photos = [],
    posterPath = "",
    director = "",
    rating = 0,
    releaseYear = 0,
    reviews = [],
    title = "Unknown title",
    trailer = "",
  } = movieShow ?? {}

  const filteredActors = actors.filter(actor => actor.photo).slice(0, 3)

  const handlerBack = () => {
    navigate("../")
  }

  useEffect(() => {
    setNumberRandomMovie(usedNumbers[usedNumbers.length - 1])
  }, [usedNumbers])

  useEffect(() => {
    if (movieShow) {
      const timer = setTimeout(() => {
        dispatch(setLoading(false))
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [movieShow])

  const arryGenres: string[] = genres

  const handleRecommend = () => {
    navigate(`../${RoutesPath.RECOMMENDATIONS}`)
  }

  return movies.loading ? (
    <Loading />
  ) : (
    <div className="movie">
      <div className="movie-content">
        <div className="movie-header">
          <a href="#" className="movie-link" onClick={handlerBack}>
            ← GO HOME
          </a>
          <h1 className="movie-page-title">Film for you</h1>
        </div>
        <div className="movie-coteiner-info">
          <div className="movie-poster">
            <img src={posterPath} alt={title} />
          </div>
          <div className="movie-container">
            <div className="movie-details">
              <h1 className="movie-title item-1">
                {`${title} ( ${releaseYear} )`}
              </h1>
              <p className="movie-description item-2">
                {`${overview.slice(0, 550)} ...`}
              </p>

              <div className="movie-tags item-3">
                {arryGenres?.map((genre, index) => (
                  <span key={index} className="movie-tag">
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div className="movie-meta">
              <div className="movie-meta-item">
                <strong>Director:</strong>
                <br />
                {director}
              </div>
              <div className="movie-meta-item">
                <strong>Duration:</strong>
                <br />
                {duration}
              </div>
              <div className="movie-meta-item">
                <strong>IMDB Rating:</strong>
                <br />
                {rating}
              </div>
            </div>
            <button className="movie-button">
              <a href={trailer} target="_blank">
                WATCH TRAILER
              </a>
            </button>
          </div>
        </div>
      </div>
      {photos.length > 1 && (
        <div className="movie-photos">
          <div className="movie-row">
            <h2 className="movie-section-title">Photos</h2>
            {/* <a href="#" className="movie-link" onClick={e => e.preventDefault()}>
            VIEW ALL
          </a> */}
          </div>
          <GalleryComponent photos={photos.slice(0,4)} />
        </div>
      )}

      <div className="movie-cast">
        <div className="movie-row">
          <h2 className="movie-section-title">Top Cast</h2>
          {/* <a href="#" className="movie-link" onClick={e => e.preventDefault()}>
            VIEW ALL
          </a> */}
        </div>

        <div className="movie-cast-list">
          {filteredActors.map((actor, index) => (
            <div key={index} className="movie-cast-item">
              <img
                src={actor.photo}
                alt={actor.name}
                className="movie-cast-photo"
              />
              <div>
                <span className="movie-cast-name">{actor.name}</span>
                <span className="movie-cast-role">{actor.character}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* {reviews.length > 1 && (
        <div className="movie-reviews">
          <div className="movie-row">
            <h2 className="movie-section-title">User Reviews</h2>
          </div>
          {reviews.slice(0, 3).map(review => {
            let clerText = stripHTML(review.content)
            return (
              <div className="movie-review">
                <div key={review.id} className="movie-review-item">
                  <h3 className="movie-review-title">
                    "{`${clerText.slice(0, 20)}...`}"
                  </h3>
                  <div className="movie-review-item--author-block">
                    <Avatar
                      src={review.avatarPath || undefined}
                      alt={review.author}
                    >
                      {!review.avatarPath &&
                        review.author.charAt(0).toUpperCase()}
                    </Avatar>
                    <p className="movie-review-author">
                      {review.author}
                      <br />
                      {clerText.slice(0, 120) + ".."}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )} */}

{reviews.length > 1 && (
  <div className="movie-reviews">
    <div className="movie-row">
      <h2 className="movie-section-title">User Reviews</h2>
    </div>
    {reviews.slice(0, 3).map((review) => {
      const clearText = stripHTML(review.content);
      const isExpanded = expandedReviewId === review.id;

      return (
        <div key={review.id} className="movie-review">
          <div className="movie-review-item">
            <h3 className="movie-review-title">
              "{`${clearText.slice(0, 20)}...`}"
            </h3>
            <div className="movie-review-item--author-block">
              <Avatar
                src={review.avatarPath || undefined}
                alt={review.author}
              >
                {!review.avatarPath && review.author.charAt(0).toUpperCase()}
              </Avatar>
              <p className="movie-review-author">
                {review.author}
                <br />
                {isExpanded
                  ? clearText
                  : `${clearText.slice(0, 120)}.. `}
                {!isExpanded && clearText.length > 120 && (
                  <span
                    className="movie-review-author--link-more"
                    // style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
                    onClick={() => setExpandedReviewId(review.id)}
                  >
                    See More
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      );
    })}
  </div>
)}


      <div className="movie-actions">
        <div>
          <button
            onClick={handleRecommend}
            className="movie-button movie-button--secondary"
          >
            EXPLORE LIST RECOMMENDATION
          </button>
          <button className="movie-button movie-button--secondary">
            GET ANOTHER RECOMMENDATION
          </button>
        </div>
        <button className="movie-button movie-button--primary">
          FIND THE WAY TO WATCH →
        </button>
      </div>
    </div>
  )
}

export default Movie
