export interface Movie {
  id: string
  posterPath: string
}

export interface MovieData {
  countries: string
  id: string
  title: string
  overview: string
  posterPath: string
  trailer: string
  duration: string
  director: string
  rating: number
  releaseYear: number
  keywords: string | null
  genres: string[]
  actors: Array<{
    name: string
    photo: string
    character: string
    rating: string
  }>

  photos: string[]

  reviews: Array<{
    author: string
    avatarPath: null | string
    content: string
    id: string
    time: string
    rating: string
  }>
  type: string
}

export interface MoviesState {
  data: Movie[]
  selectedMovie: MovieData | null | MovieData[]
  loading: boolean
  error: string | null
}
