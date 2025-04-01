export interface VibeMovieReview {
  id: string
  author: string
  avatarPath: string
  content: string
  time: string
  rating: number
}

export interface VibeMovieActor {
  character: string
  name: string
  photo: string
}

export interface VibeMovie {
  id: string
  title: string
  genres: string[]
  rating: number
  trailer: string
  posterPath: string
  duration: string
  director: string
  photos: string[]
  actors: VibeMovieActor[]
  reviews: VibeMovieReview[]
  releaseYear: number
  overview: string
  type: string
  points: number
}

export interface VibeMovieSort {
  direction: string
  nullHandling: string
  ascending: boolean
  property: string
  ignoreCase: boolean
}

export interface VibeMoviePageable {
  offset: number
  sort: VibeMovieSort[]
  paged: boolean
  pageNumber: number
  pageSize: number
  unpaged: boolean
}

export interface VibeMoviesData {
  size: number
  content: VibeMovie[]
  number: number
  sort: VibeMovieSort[]
  numberOfElements: number
  pageable: VibeMoviePageable
  first: boolean
  last: boolean
  empty: boolean
}
