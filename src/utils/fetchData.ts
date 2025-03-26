/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = "https://backend-muvio.onrender.com/api"

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay))
}

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE"

function request<T>(
  url: string,
  method: RequestMethod = "GET",
  data: any = null,
  params: Record<string, any> = {},
): Promise<T> {
  const options: RequestInit = { method }

  if (data) {
    options.body = JSON.stringify(data)
    options.headers = {
      "Content-Type": "application/json; charset=UTF-8",
    }
  }

  const queryString = new URLSearchParams(params).toString()
  const fullUrl = `${BASE_URL}${url}${queryString ? `?${queryString}` : ""}`

  return wait(300)
    .then(() => fetch(fullUrl, options))
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    })
}

export const client = {
  addMovie: <T>(data: any) => request<T>("/media", "POST", data),

  updateMovie: <T>(id: string, data: any) =>
    request<T>(`/media/${id}`, "PUT", data),

  deleteMovie: (id: string) => request(`/media/${id}`, "DELETE"),

  getMovieById: <T>(id: string) => request<T>(`/media/${id}`),

  getMovies: <T>(page: number = 0, size: number = 10, sort: string[] = []) =>
    request<T>("/media", "GET", null, { page, size, sort }),

  getMoviesByVibe: <T>(
    data: { vibe: string; years: string; type: string; categories: string[] },
    page: number = 0,
    size: number = 10,
    sort: string[] = [],
  ) => request<T>("/media/vibe", "GET", data, { page, size, sort }),
}
