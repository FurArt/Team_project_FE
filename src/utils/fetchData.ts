import { VibeFilters } from "../types/vibe"

/* eslint-disable @typescript-eslint/no-explicit-any */
// const BASE_URL = "https://backend-muvio.onrender.com/api"
// const BASE_URL = "https://muvio.fly.dev/api"
const BASE_URL = "https://muvio.duckdns.org/api"
export function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay))
}

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE"

function request<T>(
  url: string,
  method: RequestMethod = "GET",
  data: any = null,
  params: Record<string, any | null> = {},
): Promise<T> {
  const options: RequestInit = { method }

  if (data) {
    options.body = JSON.stringify(data)
    options.headers = {
      "Content-Type": "application/json; charset=UTF-8",
    }
  }

  // Custom query string builder to include null values
  const queryString = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${value === null ? "null" : encodeURIComponent(value)}`,
    )
    .join("&")

  const fullUrl = `${BASE_URL}${url}${queryString ? `?${queryString}` : ""}`
  console.log(fullUrl)

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
  getTitleMovie: <T>(
    page: number = 0,
    size: number = 7000,
    sort: string = "rating",
  ) => request<T>("/media/titles", "GET", null, { page, size, sort }),

  getTitleMovieSearch: <T>(
    search: string = "",
    page: number = 1,
    size: number = 1,
    sort: string = "rating",
  ) => request<T>(`/media/titles/${search}`, "GET", null, {}),

  updateMovie: <T>(id: string, data: any) =>
    request<T>(`/media/${id}`, "PUT", data),

  deleteMovie: (id: string) => request(`/media/${id}`, "DELETE"),

  getMovieById: <T>(id: string) => request<T>(`/media/${id}`),

  getMovieByLuck: <T>(size: number) => request<T>(`/media/luck/${size}`),

  getMovies: <T>(page: number = 0, size: number = 71, sort: string[] = []) =>
    request<T>("/media/posters", "GET", null, { size }),

  getMediaGallery: <T>(
    title?: string,
    years?: string,
    type?: string,
    page: number = 0,
    size: number = 100,
    sort: string[] = [],
  ) =>
    request<T>("/media/gallery", "GET", null, {
      title,
      years,
      type,
      page,
      size,
      sort,
    }),

  getTopListMovies: <T>(
    listType: string,
    page: number = 0,
    size: number = 10,
    sort: string[] = ["rating"],
  ) =>
    request<T>(`/media/top-list/${listType}`, "GET", null, {
      page,
      size,
      sort,
    }),

  getMoviesByVibe: <T>(
    filters: VibeFilters,
    page: number = 0,
    size: number = 10,
    sort: string[] = ["rating,desc"],
  ): Promise<T> => {
    const params: Record<string, string | number> = {
      page,
      size,
      vibe: filters.vibe || "",
      years: filters.years || "",
      type: filters.type || "",
      categories: filters.categories?.join(",") || "",
    }

    const searchParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
      if (value !== "") {
        searchParams.append(key, String(value))
      }
    })

    sort.forEach(sortParam => {
      searchParams.append("sort", sortParam)
    })

    const queryString = searchParams.toString()

    return request<T>(`/media/vibe?${queryString}`, "GET")
  },
}

// https://backend-muvio.onrender.com/api/media/titles?page=0&size=1
// https://backend-muvio.onrender.com/api/media/title?page=0&size=100&sort=rating
