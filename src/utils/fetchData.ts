/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = "https://backend-moodie.onrender.com/api"

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE"

function request<T>(
  url: string,
  method: RequestMethod = "GET",
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method }

  if (data) {
    options.body = JSON.stringify(data)
    options.headers = {
      "Content-Type": "application/json; charset=UTF-8",
    }
  }

  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    })
}

export const client = {
  getMovies: <T>(n: number = 100) => request<T>(`/movies?size=${n}`),
  addMovie: <T>(data: any) => request<T>("/movies", "POST", data),
  getMovieById: <T>(id: string) => request<T>(`/movies/${id}`),
  updateMovie: <T>(id: string, data: any) =>
    request<T>(`/movies/${id}`, "PUT", data),
  deleteMovie: (id: string) => request(`/movies/${id}`, "DELETE"),
}
