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

export enum VibeTypes {
  MAKE_ME_CHILL = "MAKE_ME_CHILL",
  SCARY_ME_SILLY = "SCARY_ME_SILLY",
  MAKE_ME_FEEL_GOOD = "MAKE_ME_FEEL_GOOD",
  MAKE_ME_DREAM = "MAKE_ME_DREAM",
  MAKE_ME_CURIOUS = "MAKE_ME_CURIOUS",
  TAKE_ME_TO_ANOTHER_WORLD = "TAKE_ME_TO_ANOTHER_WORLD",
  BLOW_MY_MIND = "BLOW_MY_MIND",
  KEEP_ME_ON_EDGE = "KEEP_ME_ON_EDGE"
}

export enum MediaTypes {
  MOVIE = "MOVIE",
  TV_SHOW = "TV_SHOW",
  SHORTS = "SHORTS"
}

export enum CategoryTypes {
  MOVIES_BASED_ON_A_TRUE_STORY = "MOVIES_BASED_ON_A_TRUE_STORY",
  SPY_MOVIES_AND_COP_MOVIES = "SPY_MOVIES_AND_COP_MOVIES",
  MOVIES_BASED_ON_A_BOOK = "MOVIES_BASED_ON_A_BOOK",
  MUST_WATCH_LIST = "MUST_WATCH_LIST",
  GIRL_POWER_MOVIES = "GIRL_POWER_MOVIES",
  LIFE_CHANGING_MOVIES = "LIFE_CHANGING_MOVIES",
  SPORT_LIFE_MOVIES = "SPORT_LIFE_MOVIES",
  IMD_TOP_250_MOVIES = "IMD_TOP_250_MOVIES"
}

export interface VibeFilters {
  vibe?: VibeTypes;        
  years?: string;          
  type: MediaTypes;        
  categories?: string[]; 
}
