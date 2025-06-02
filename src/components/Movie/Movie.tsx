import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import "./Movie.scss"
import GalleryComponent from "./Gallery/GalleryComponent"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Loading from "../Loading/Loading"
import { useSelector } from "react-redux"
import { fetchMovieByLuck, RootState, setLoading } from "../../app/store"
import { RoutesPath } from "../../utils/enumRouts"
import { MovieData } from "../../types/movie"
import { Avatar } from "@mui/material"
import { scrollToHandler } from "../../utils/scrollToHandler"

const Movie = () => {
  const dispatch = useAppDispatch()
  const { movies } = useAppSelector(state => state)
  const loading = movies.loading

  const usedNumbers = useSelector(
    (state: RootState) => state.randomNumbers.usedNumbers,
  )
  const [numberRandomMovie, setNumberRandomMovie] = useState(usedNumbers[0])
  const [expandedReviewId, setExpandedReviewId] = useState<null | string>(null)
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const idMovie = params.get("idMovie")

  const stripHTML = (text: any) => {
    if (typeof text !== "string") return ""
    return text.replace(/<\/?[a-z][\s\S]*?>/gi, "")
  }

  function isMovieArray(movie: unknown): movie is MovieData[] {
    return Array.isArray(movie) && movie.length > 0
  }

  const movieShow = isMovieArray(movies.selectedMovie)
    ? movies.selectedMovie[0]
    : movies.selectedMovie

  const {
    actors = [],
    duration = "",
    genres = [],
    id = "",
    keywords = null,
    countries = "",
    overview = "",
    photos = [],
    posterPath = "",
    director = "",
    rating = 0,
    releaseYear = 0,
    reviews = [],
    title = "Unknown title",
    trailer = "",
    type = "",
  } = movieShow ?? {}

  const filteredActors = actors.filter(actor => actor.photo).slice(0, 3)

  const handlerBack = () => {
    navigate(-1)
  }
  useEffect(() => {
    console.log(movieShow);

  }, [])

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

  const handleLuckClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      return
    }
    e.preventDefault()

    dispatch(fetchMovieByLuck(1))
    navigate(`../${RoutesPath.MOVIE}/`)
    scrollToHandler(null)
  }

  function toGoogleSearchQuery(str: string) {
    return encodeURIComponent(str.trim()).replace(/%20/g, '+');
  }
  const handleFindClick = () => {
    window.open(`https://www.google.com/search?q=${toGoogleSearchQuery(`${title} ${releaseYear}`)}`, '_blank');
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="movie">
      <div className="movie-content">
        <div className="movie-header">
          <a href="#" className="movie-link" onClick={handlerBack}>
            ← BACK
          </a>
          <h1 className="movie-page-title">Film for you</h1>
        </div>
        {/* screen for pc */}
        <div className="movie-coteiner-info">
          <div className="movie-poster">
            <img className="movie-poster-image" src={posterPath} alt={title} />
            <div className="movie-poster-rating-badge">
              {/* <img className="movie-poster-rating-image" src="vimages/icon/star_sharp.png"/> */}
              <p className="movie-poster-rating-score">{rating.toFixed(1)}/10</p>
            </div>
          </div>
          <div className="movie-container">
            <div className="movie-details">
              <h1 className="movie-title item-1">
              <>
                {title}
                <br />
                ( {releaseYear} )
              </>
              </h1>
              {/* <p className="movie-description item-2">
                {`${overview.slice(0, 550)} ...`}
              </p> */}
              <p className="movie-description item-2">
        {overview.slice(0, 150)}
        {overview.length > 200 && (
          <span
            className="movie-description--link-more"
            onClick={() => setIsModalOpen(true)}
          >
            .. See More
          </span>
        )}
              </p>
              
              {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // чтобы клик вне окна его закрыл
          >
            <button
              className="modal-close-button"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <p>{overview}</p>
          </div>
        </div>
      )}

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
                <p className="movie-meta-item-p">DIRECTOR:</p>
                <p> {director} </p>
              </div>

              <div className="movie-meta-item">
                <p className="movie-meta-item-p">COUNTRY:</p>
                <p> {countries} </p>
              </div>

              <div className="movie-meta-item">
                <p className="movie-meta-item-p">TYPE:</p>
                <p> {type} </p>  
              </div>
              
              <div className="movie-meta-item">
                <p className="movie-meta-item-p">DURATION:</p>
                <p> {duration} </p>
                
              </div>


            </div>

            <button className="movie-button">
              <a href={trailer} target="_blank">
                WATCH TRAILER
              </a>
            </button>
          </div>
        </div>
        {/* screen for mobile */}

        <div className="movie-container-info--mb">
          <div className="movie-poster--mb">
            <img src={posterPath} alt={title} />
          </div>
          <div className="movie-ceil--mb">

            <h1 className="movie-title--mb">
              {`${title} (${releaseYear})`}
            </h1>

            <p className="movie-description--mb">
              {isOverviewExpanded ? overview : `${overview.slice(0, 125)}`}
              {overview.length > 125 && (
                <span
                  className="movie-description--link-more--mb"
                  onClick={() => setIsOverviewExpanded(!isOverviewExpanded)}
                >
                  {isOverviewExpanded ? "See Less" : ".. See More"}
                </span>
              )}
            </p>

            <button className="movie-button movie-button--mb">
              <a className="movie-button-link" href={trailer} target="_blank" rel="noopener noreferrer">
                WATCH TRAILER
              </a>
            </button>
          </div>

          <p className="movie-meta-item--mb">
            Director:
            <br />
            {director}
          </p>
          <p className="movie-meta-item--mb">
            Type:
            <br />
            {type}
          </p>
          <p className="movie-meta-item--mb">
            IMDB Rating:
            <br />
            {rating.toFixed(2)}
          </p>
          <p className="movie-meta-item--mb">
            Duration:
            <br />
            {duration}
          </p>

          <div className="movie-tags movie-tags--mb">
            {arryGenres?.slice(0, 5).map((genre, index) => (
              <span key={index} className="movie-tag">
                {genre}
              </span>
            ))}
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
          <GalleryComponent photos={photos.slice(0, 4)} />
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

      {reviews.length > 1 && (
        <div className="movie-reviews">
          <div className="movie-row">
            <h2 className="movie-section-title">User Reviews</h2>
          </div>
          {reviews.slice(0, 3).map(review => {
            const clearText = stripHTML(review.content)
            const isExpanded = expandedReviewId === review.id
            const { id, avatarPath, author } = review

            return (
              <div className="movie-reviews-row">
                <div key={id} className="movie-review">
                  <div className="movie-review-item">
                    <div className="movie-review-item--author-block">
                      <Avatar src={avatarPath || undefined} alt={author}>
                        {!avatarPath && author.charAt(0).toUpperCase()}
                      </Avatar>
                      <p className="movie-review-author">
                        {author}
                        <br />
                        {isExpanded
                          ? (
                            <>
                              {clearText}
                              {clearText.length > 120 && (
                                <span
                                  className="movie-review-author--link-more"
                                  onClick={() => setExpandedReviewId(null)}
                                >
                                  See Less
                                </span>
                              )}
                            </>
                          )
                          : (
                            <>
                              {`${clearText.slice(0, 120)}.. `}
                              {clearText.length > 120 && (
                                <span
                                  className="movie-review-author--link-more"
                                  onClick={() => setExpandedReviewId(id)}
                                >
                                  See More
                                </span>
                              )}
                            </>
                          )
                        }
                      </p>
                    </div>
                  </div>
                </div>
                <div className="movie-review movie-review--rating">
                  <p>{`${rating}/10`}</p>

                  <span>IMDb </span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="movie-actions">
        <div>
          {movies.vibe && (
            <button
              onClick={handleRecommend}
              className="movie-button movie-button--secondary"
            >
              EXPAND LIST OF RECOMMANDATION
            </button>
          )}

          {!movies.vibe && (
            <button
              onClick={handleLuckClick}
              className="movie-button movie-button--secondary"
            >
              GET ANOTHER MOVIE
            </button>
          )}
        </div>
        <button className="movie-button movie-button--primary"

          onClick={handleFindClick}
        >
          FIND THE WAY TO WATCH →
        </button>
      </div>
    </section>
  )
}

export default Movie
