export enum TopListTypes {
    ICONIC_MOVIES_OF_THE_21ST_CENTURY = "ICONIC_MOVIES_OF_THE_21ST_CENTURY",
    TOP_OSCAR_WINNING_MASTERPIECES = "TOP_OSCAR_WINNING_MASTERPIECES",
    TOP_MOST_WATCHED_BLOCKBUSTERS_OF_THE_DECADE = "TOP_MOST_WATCHED_BLOCKBUSTERS_OF_THE_DECADE",
    TOP_100_SUPERHERO_MOVIES = "TOP_100_SUPERHERO_MOVIES",
    TOP_RATED_IMDB_MOVIES_OF_ALL_TIME = "TOP_RATED_IMDB_MOVIES_OF_All_TIME",
    TOP_EMMY_WINNING_MASTERPIECES = "TOP_EMMY_WINNING_MASTERPIECES",
  }

interface Sort {
    direction: string;
    nullHandling: string;
    ascending: boolean;
    property: string;
    ignoreCase: boolean;
  }
  
  interface Pageable {
    offset: number;
    sort: Sort[];
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  }
  
  interface TopListMovieContent {
    id: string;
    title: string;
    genres: string[];
    rating: number;
    posterPath: string;
    duration: string;
    director: string;
    actors: string[];
    releaseYear:string;
  }
  
  export interface TopListMovieResponse {
    size: number;
    content: TopListMovieContent[];
    number: number;
    sort: Sort[];
    numberOfElements: number;
    pageable: Pageable;
    first: boolean;
    last: boolean;
    empty: boolean;
  }

  export interface TopListsHeader {
  title: string
  value: TopListTypes
  description?: string
}