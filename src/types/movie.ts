export interface Movie {
  id: string
  posterPath: string
}

export interface MovieData {
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
  }>
  type: string
}

export interface MoviesData {
  content: Movie[]
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  size: number
  pageable: {
    pageNumber: number
    pageSize: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    offset: number
    paged: boolean
  }

  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
}

export interface MoviesState {
  data: MoviesData | null | MoviesData[]
  selectedMovie: MovieData | null | MovieData[]
  loading: boolean
  error: string | null
}
