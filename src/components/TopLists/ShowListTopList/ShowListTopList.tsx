import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import "./ShowListTopList.scss";
import { RoutesPath } from "../../../utils/enumRouts";
import { MovieData } from "../../../types/movie";

import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { PaginationItem, Stack } from "@mui/material";
import { useState } from "react";
import { scrollToHandler } from "../../../utils/scrollToHandler";

const itemsPerPage = 6;

const NextText = () => (
  <>
    <Typography>Next</Typography>
  </>
);

const ShowListTopList = () => {
  const navigate = useNavigate();

  const { data: movies, loading, error } = useAppSelector(
    (state) => state.movies as { data: MovieData[]; loading: boolean; error: string | null }
  );
  const [searchMovies, setSearchMovies] = useState<MovieData[] | null>(null);
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * itemsPerPage

  const displayedMovies = (searchMovies !== null ? searchMovies : movies).slice(
    startIndex,
    startIndex + itemsPerPage,
  )

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const idlist = params.get(`id${RoutesPath.SHOWTOPLISTS}`);

  const getPageCount = (
    movies: MovieData[],
    searchMovies: MovieData[] | null,
    itemsPerPage: number
  ): number => {
    const totalItems =
      searchMovies && searchMovies.length > 0
        ? searchMovies.length
        : movies.length;
    return Math.ceil(totalItems / itemsPerPage);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlerBack = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate(`../${RoutesPath.TOPLISTS}`);
  };

  const handleSelectMovie = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    navigate(`../movie?idMovie=${id}`)

    scrollToHandler(e)
  }

  return (
    <section className="conteiner">
      <div className="show-top-lists">
        <a href="#" className="show-top-lists-link" onClick={handlerBack}>
          ← BACK
        </a>
        <h2>TOP 100 SUPERHERO FILMS</h2>
        <p>
          We have compiled a list of the 50 best superhero movies ever made, according to IMDb. From Marvel to DC and even some unexpected ones.
        </p>
        <div className="movie-list">
          {displayedMovies?.map((movie, index) => {
            const { posterPath, title, rating, genresDto, duration, director, actorsDto, id } = movie;
            return (
              <div
                className="movie-card"
                key={index}
                onClick={(e) => handleSelectMovie(e, id)}
              >
                <span className="movie-index">{`0${index + 1 + startIndex}`}</span>
                <img src={posterPath} alt={title} className="movie-poster" />
                <div className="movie-info">
                  <h4>{title}</h4>
                  <p>
                    {Array.isArray(genresDto)
                      ? genresDto
                        .map((g) => g)
                        .slice(0, 2)
                        .join(", ")
                      : null}
                  </p>
                </div>
                <div className="movie-info">
                  <h4>
                    {`DIRECTOR: ${director}`}
                  </h4>
                  <p>
                    Cast:{" "}
                    {Array.isArray(actorsDto)
                      ? actorsDto
                        .map((a) => a.name)
                        .slice(0, 4)
                        .join(", ")
                      : null}
                  </p>
                </div>
                <div className="movie-info">
                  <h4>
                    {`IMDB ${rating.toFixed(1)}/10`}
                  </h4>
                  <p>{duration}</p>
                </div>
              </div>
            );
          })}
        </div>
        <Stack spacing={2} className="pagination">
          <Pagination
            count={getPageCount(movies, searchMovies, itemsPerPage)}
            page={page}
            onChange={handleChange}
            onClick={scrollToHandler}
            hideNextButton={false}
            shape="rounded"
            showLastButton
            renderItem={(item) => (
              <PaginationItem slots={{ next: NextText }} {...item} />
            )}
          />
        </Stack>
      </div>
    </section>
  );
};

export default ShowListTopList;
