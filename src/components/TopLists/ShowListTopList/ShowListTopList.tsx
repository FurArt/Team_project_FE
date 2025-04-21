// import { useLocation, useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../../app/hooks";
// import "./ShowListTopList.scss";
// import { RoutesPath } from "../../../utils/enumRouts";
// import { MovieData } from "../../../types/movie";

// import Typography from "@mui/material/Typography";
// import Pagination from "@mui/material/Pagination";
// import { PaginationItem, Stack } from "@mui/material";
// import { useEffect, useState } from "react";
// import { scrollToHandler } from "../../../utils/scrollToHandler";
// import { handleSelectMovie } from "../../../app/store";

// const itemsPerPage = 6;

// const NextText = () => (
//   <>
//     <Typography>Next</Typography>
//   </>
// );

// const ShowListTopList = () => {
//   const navigate = useNavigate();

//   const { topLists, loading } = useAppSelector(
//     (state) => state.movies
//   );
//   const movies = topLists?.content
//   const [searchMovies, setSearchMovies] = useState<[] | null>(null);
//   const [page, setPage] = useState(1);
//   const startIndex = (page - 1) * itemsPerPage
//   const displayedMovies = (searchMovies !== null ? searchMovies : movies).slice(

//   // const displayedMovies = (searchMovies !== null ? searchMovies : []).slice(
//     startIndex,
//     startIndex + itemsPerPage,
//   )
//   // const displayedMovies = []
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const idlist = params.get(`id${RoutesPath.SHOWTOPLISTS}`);

//   const getPageCount = (
//     movies: MovieData[],
//     searchMovies: MovieData[] | null,
//     itemsPerPage: number
//   ): number => {
//     const totalItems =
//       searchMovies && searchMovies.length > 0
//         ? searchMovies.length
//         : movies.length;
//     return Math.ceil(totalItems / itemsPerPage);
//   };

//   const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {

//     setPage(value);
//   };

//   const handlerBack = (e: React.MouseEvent) => {
//     e.preventDefault()
//     navigate(`../${RoutesPath.TOPLISTS}`);
//   };

//   const dispatch = useAppDispatch();
//   const handleClick = (e: React.MouseEvent, id: string) => {
//     dispatch(handleSelectMovie(e, id, navigate));
//   };

//   useEffect(() => {
//     scrollToHandler(null)
//   }, [page])

//   return (
//     <section className="conteiner">
//       <div className="show-top-lists">
//         <a href="#" className="show-top-lists-link" onClick={handlerBack}>
//           ← BACK
//         </a>
//         <h2>TOP 100 SUPERHERO FILMS</h2>
//         <p>
//           We have compiled a list of the 50 best superhero movies ever made, according to IMDb. From Marvel to DC and even some unexpected ones.
//         </p>
//         <div className="movie-list">
//           {displayedMovies?.map((movie, index) => {
//             const { posterPath, title, rating, genres, duration, director, actors, id } = movie;
//             return (
//               <div
//                 className="movie-card"
//                 key={index}
//                 onClick={(e) => handleClick(e, id)}
//               >
//                 <span className="movie-index">{`0${index + 1 + startIndex}`}</span>
//                 <img src={posterPath} alt={title} className="movie-poster" />
//                 <div className="movie-info">
//                   <h4>{title}</h4>
//                   <p>
//                     {Array.isArray(genres)
//                       ? genres
//                         .map((g) => g)
//                         .slice(0, 2)
//                         .join(", ")
//                       : null}
//                   </p>
//                 </div>
//                 <div className="movie-info">
//                   <h4>
//                     {`DIRECTOR: ${director}`}
//                   </h4>
//                   <p>
//                     Cast:{" "}
//                     {Array.isArray(actors)
//                       ? actors
//                         .map((a) => a.name)
//                         .slice(0, 4)
//                         .join(", ")
//                       : null}
//                   </p>
//                 </div>
//                 <div className="movie-info">
//                   <h4>
//                     {`IMDB ${rating.toFixed(1)}/10`}
//                   </h4>
//                   <p>{duration}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         {displayedMovies.length < 2 ? null : (<Stack spacing={2} className="pagination">
//           <Pagination
//             count={getPageCount(movies, searchMovies, itemsPerPage)}
//             page={page}
//             onChange={handleChange}
//             onClick={scrollToHandler}
//             hideNextButton={false}
//             shape="rounded"
//             showLastButton
//             renderItem={(item) => (
//               <PaginationItem slots={{ next: NextText }} {...item} />
//             )}
//           />
//         </Stack>)}
//       </div>
//     </section>
//   );
// };

// export default ShowListTopList;

import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import "./ShowListTopList.scss";
import { RoutesPath } from "../../../utils/enumRouts";
import { MovieData } from "../../../types/movie";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { PaginationItem, Stack, CircularProgress, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { scrollToHandler } from "../../../utils/scrollToHandler";

const itemsPerPage = 6;

const NextText = () => (
  <Typography>Next</Typography>
);

const ShowListTopList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { topLists, loading, error } = useAppSelector((state) => state.movies);
  
  const [searchMovies, setSearchMovies] = useState<MovieData[] | null>(null);
  const [page, setPage] = useState(1);

  // Get the list ID from URL
  const params = new URLSearchParams(location.search);
  const listId = params.get("id");

  // Safe data handling
  const movies = topLists?.content || [];
  const startIndex = (page - 1) * itemsPerPage;
  const displayedMovies = (searchMovies || movies).slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getPageCount = (): number => {
    const totalItems = searchMovies ? searchMovies.length : movies.length;
    return Math.ceil(totalItems / itemsPerPage);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlerBack = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`../${RoutesPath.TOPLISTS}`);
  };

  useEffect(() => {
    scrollToHandler(null);
  }, [page]);

  useEffect(()=>{
    console.log(
      displayedMovies

    );
    
  })

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
        <Typography>Loading top list movies...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" className="error-container">
        Error loading movies: {error}
        <button onClick={handlerBack}>Go back</button>
      </Alert>
    );
  }

  if (!movies.length) {
    return (
      <div className="empty-container">
        <Typography>No movies found in this list</Typography>
        <button onClick={handlerBack}>Go back</button>
      </div>
    );
  }

  return (
    <section className="conteiner">
      <div className="show-top-lists">
        <a href="#" className="show-top-lists-link" onClick={handlerBack}>
          ← BACK
        </a>
        <h2>TOP 100 SUPERHERO FILMS</h2>
        <p>
          We have compiled a list of the 50 best superhero movies ever made, according to IMDb.
        </p>
        
        <div className="movie-list">
          {displayedMovies.map((movie, index) => {
            const { posterPath, title, rating, genres, duration, director, actors, id } = movie;
            return (
              <div
                className="movie-card"
                key={`${id}-${index}`}
                onClick={() => navigate(`../${RoutesPath.MOVIE}?idMovie=${id}`)}
              >
                <span className="movie-index">{`0${index + 1 + startIndex}`}</span>
                <img src={posterPath} alt={title} className="movie-poster" />
                <div className="movie-info">
                  <h4>{title}</h4>
                  <p>
                    {Array.isArray(genres) ? genres.slice(0, 2).join(", ") : null}
                  </p>
                </div>
                <div className="movie-info">
                  <h4>{`DIRECTOR: ${director}`}</h4>
                  {/* <p>
                    Cast: {Array.isArray(actors) ? actors.slice(0, 4).map(a => a.name).join(", ") : null}
                  </p> */}

<p>
                    Cast:{" "}
                     {Array.isArray(actors)
                      ? actors
                        .map((actor) => actor)
                        .slice(0, 4)
                        .join(", ")
                      : null}
                  </p>
                </div>
                <div className="movie-info">
                  <h4>{`IMDB ${rating?.toFixed(1) || 'N/A'}/10`}</h4>
                  <p>{duration}</p>
                </div>
              </div>
            );
          })}
        </div>

        {movies.length > itemsPerPage && (
          <Stack spacing={2} className="pagination">
            <Pagination
              count={getPageCount()}
              page={page}
              onChange={handleChange}
              onClick={() => scrollToHandler(null)}
              hideNextButton={false}
              shape="rounded"
              showLastButton
              renderItem={(item) => (
                <PaginationItem slots={{ next: NextText }} {...item} />
              )}
            />
          </Stack>
        )}
      </div>
    </section>
  );
};

export default ShowListTopList;