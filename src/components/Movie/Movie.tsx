import { useEffect, useState } from "react"
import { useAppSelector } from "../../app/hooks"
import "./Movie.scss"
import GalleryComponent from "./Gallery/GalleryComponent"
import { castPhotos } from "./Gallery/cast-photos"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Loading from "../Loading/Loading"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { RoutesPath } from "../../utils/enumRouts"
import { MovieData } from "../../types/movie"
import { Avatar } from "@mui/material"
// import { Avatar } from "@base-ui-components/react/avatar"

type Genre = {
  id: string
  name: string
}

const Movie = () => {
  const { data: movies, loading, error } = useAppSelector(
    (state) => state.movies as { data: MovieData[]; loading: boolean; error: string | null }
  );


  const usedNumbers = useSelector(
    (state: RootState) => state.randomNumbers.usedNumbers,
  )
  const [numberRandomMovie, setNumberRandomMovie] = useState(usedNumbers[0])
  const navigate = useNavigate()
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const idMovie = params.get("idMovie");

  
  const movieShow = movies?.[numberRandomMovie]

  const {
    actorsDto = [],
    duration = '',
    genresDto = [],
    id = '',
    keywords = null,
    overview = '',
    photos = [],
    posterPath = '',
    producer = '',
    rating = 0,
    releaseYear = 0,
    reviewsDto = [],
    title = 'Unknown title',
    trailer = '',
  } = movieShow ?? {};

  const filteredActors = actorsDto
    .filter((actor) => actor.photo)
    .slice(0, 3)

  const handlerBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    setNumberRandomMovie(usedNumbers[usedNumbers.length - 1])
  }, [usedNumbers])

  useEffect(()=>{
    console.log(`idMovie`);

    console.log(idMovie);
  })

  const arryGenres: string[] = genresDto;

  useEffect(() => {
    console.log(idMovie);
    
  
    const indexShow = movies.findIndex(movie => movie?.id === idMovie);
    
    console.log(indexShow);
    if (indexShow === -1) {
      setNumberRandomMovie(usedNumbers[usedNumbers.length - 1])
      return;
    }
    setNumberRandomMovie(indexShow);
  });

  const handleRecommend = () => {
    navigate(`../${RoutesPath.RECOMMENDATIONS}`)
  }

  return loading ? (
    <Loading />
  ) : (
    <div className="movie">
      <div className="movie-content">
        <div className="movie-header">
          <a href="#" className="movie-link" onClick={handlerBack}>
            ← BACK
          </a>
          <h1 className="movie-page-title">Film for you</h1>
        </div>
        <div className="movie-info">
          <div className="movie-poster">
            <img src={posterPath} alt={title} />
          </div>
          <div className="movie-container">
            <div className="movie-details">
              <h1 className="movie-title item-1">
                {`${title} ${releaseYear}`}
              </h1>
              <p className="movie-description item-2">
                {overview}
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
                {producer}
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
            <button className="movie-button" >

              <a href={trailer} target="_blank">

                WATCH TRAILER
              </a>

            </button>
          </div>
        </div>
      </div>

      <div className="movie-photos">
        <div className="movie-row">
          <h2 className="movie-section-title">
            Photos
          </h2>
          <a href="#" className="movie-link" onClick={e => e.preventDefault()}>
            VIEW ALL
          </a>
        </div>
        <GalleryComponent photos={photos} />
      </div>

      <div className="movie-cast">
        <div className="movie-row">
          <h2 className="movie-section-title">
            Top Cast TODO NEED DATA FROM SERVER
          </h2>
          <a href="#" className="movie-link" onClick={e => e.preventDefault()}>
            VIEW ALL
          </a>
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
                <span className="movie-cast-role">{actor.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {reviewsDto.length > 1 && (
        <div className="movie-reviews">
          <h2 className="movie-section-title">User Reviews</h2>
          <div className="movie-review">
            {reviewsDto.slice(0, 3).map((review) => (
              <div key={review.id} className="movie-review-item">
                <h3 className="movie-review-title">"{`${review.content.slice(0, 20)}...`}"</h3>
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
                    {review.content.slice(0, 120) + '..'}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
