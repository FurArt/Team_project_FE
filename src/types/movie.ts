// export interface Movie {
//   id: string
//   title: string
//   year: number
//   director: string
//   genre: string
//   rating: number
// }

// export interface MovieData {
//   title: string
//   year: number
//   director: string
//   genre: string
//   rating: number
// }
export interface MovieData {
  actorsDto: Array<{
    name: string
    photo: string
  }>
  duration: string
  genresDto: string[]
  id: string
  keywords: string | null
  overview: string
  photos: string[]
  posterPath: string
  director: string
  rating: number
  releaseYear: number
  reviewsDto: Array<{
    author: string
    avatarPath: null | string
    content: string
    id: string
    time: string
  }>
  title: string
  trailer: string
}
