/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://backend-moodie.onrender.com/api';

// a promise resolved after a given delay
function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

// To have autocompletion and avoid mistypes
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null, // we can send any data to the server
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    // We add body and Content-Type only for the requests with data
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  // for a demo purpose we emulate a delay to see if Loaders work
  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
}

export const client = {
  // Get all movies
  getMovies: <T>() => request<T>('/movies'),

  // Add a new movie
  addMovie: <T>(data: any) => request<T>('/movies', 'POST', data),

  // Get a specific movie by ID
  getMovieById: <T>(id: string) => request<T>(`/movies/${id}`),

  // Update a specific movie by ID
  updateMovie: <T>(id: string, data: any) => request<T>(`/movies/${id}`, 'PUT', data),

  // Delete a specific movie by ID
  deleteMovie: (id: string) => request(`/movies/${id}`, 'DELETE'),
};