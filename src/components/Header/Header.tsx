import { useNavigate, useLocation } from "react-router-dom"
import classNames from "classnames"
import "./Header.scss"
import { useDispatch } from "react-redux"
import { generateRandomNumber } from "../../app/randomNumbersSlice"
import { useAppSelector } from "../../app/hooks"
import { RoutesPath } from "../../utils/enumRouts"
import PopoverSearch from "./PopoverSearch/PopoverSearch"
import { useState } from "react"
import { scrollToHandler } from "../../utils/scrollToHandler"
import Footer from "../Footer/Footer"
import { Autocomplete, TextField } from "@mui/material"
import { MovieData } from "../../types/movie"

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { data: movies, loading } = useAppSelector(state => state.movies)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchMovie, setSearchMovies] = useState<MovieData | null>(null);


  const closeMenu = () => setIsMenuOpen(false);

  // const handleMenuClick = (
  //   e: React.MouseEvent<HTMLAnchorElement>,
  //   target: string,
  // ) => {
  //   if (loading) {
  //     return
  //   }
  //   e.preventDefault()
  //   navigate(`${target}`)
  //   console.log(
  //     RoutesPath.HOME,

  //   );

  // }

  const handleMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    if (loading) return;
    e.preventDefault();
    navigate(target);
    closeMenu();
    scrollToHandler(null)
  };


  const handleLuckClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (loading) {
      return
    }
    e.preventDefault()
    console.log(movies.length);

    dispatch(generateRandomNumber((movies.length - 1)))
    navigate(`${RoutesPath.MOVIE}/`)
    closeMenu();
    scrollToHandler(null);

  }

  const handleSearchChange = (_: any, value: MovieData | null) => {
    setSearchMovies(value);
    if (value) {
      navigate(`../movie?idMovie=${value?.id}`)
    }
  };

  return (
    <header className="header-page" id="header">
      <div className="top-bar menu-container--desktop">
        <a
          href="#"
          className="icons-logo"
          id="logo"
          onClick={e => handleMenuClick(e, RoutesPath.HOME)}
        ></a>
        <div className="menu">
          <nav>
            <ul className="menu-list">
              <li
                className={classNames("menu-item", {
                  active: location.pathname === RoutesPath.HOME,
                })}
              >
                <a
                  href="#"
                  className="menu-link"
                  onClick={e => handleMenuClick(e, RoutesPath.HOME)}
                >
                  Movie Picker
                </a>
              </li>
              <li
                className={classNames("menu-item", {
                  active: location.pathname === `/${RoutesPath.TOPLISTS}`,
                })}
              >
                <a
                  href="#"
                  className="menu-link"
                  onClick={e => handleMenuClick(e, RoutesPath.TOPLISTS)}
                >
                  TOP lists
                </a>
              </li>
              <li
                className={classNames("menu-item", {
                  active: location.pathname === `/${RoutesPath.GALLERY}`,
                })}
              >
                <a
                  href="#"
                  className="menu-link"
                  onClick={e => handleMenuClick(e, RoutesPath.GALLERY)}
                >
                  Gallery
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="top-bar-container">
          <PopoverSearch />
        </div>
        <div className="top-bar-button">
          <a
            href="#"
            className="top-bar-button--link"
            onClick={handleLuckClick}
          >
            PUSH THE LUCK
          </a>
        </div>
      </div>

      <div className="top-bar menu-container--table">
        <a href="#" className="icons-logo"></a>
        <a
          href="#"
          className="icons icons--menu"
          onClick={(e) => {
            e.preventDefault()
            setIsMenuOpen(true)
          }}></a>

      </div>



      <aside className={classNames("menu-aside", { "menu-aside-active": isMenuOpen })}>
        <div className="menu-aside-full">
          <a href="#" className="icons-logo"></a>
          <a href="#" className="icons icons--close" onClick={closeMenu}></a>
        </div>

        <ul className="menu-list">
          <li className={classNames("menu-item", { active: location.pathname === RoutesPath.HOME })}>
            <a href="#" className="menu-link" onClick={e => handleMenuClick(e, RoutesPath.HOME)}>
              Movie Picker
            </a>
          </li>
          <li className={classNames("menu-item", { active: location.pathname === `/${RoutesPath.TOPLISTS}` })}>
            <a href="#" className="menu-link" onClick={e => handleMenuClick(e, RoutesPath.TOPLISTS)}>
              TOP lists
            </a>
          </li>
          <li className={classNames("menu-item", { active: location.pathname === `/${RoutesPath.GALLERY}` })}>
            <a href="#" className="menu-link" onClick={e => handleMenuClick(e, RoutesPath.GALLERY)}>
              Gallery
            </a>
          </li>
        </ul>
        <div className="top-bar-button">
          <a
            href="#"
            className="top-bar-button--link"
            onClick={handleLuckClick}
          >
            PUSH THE LUCK
          </a>

          <div className="popover-portal-search">
            <Autocomplete

              options={movies}
              getOptionLabel={(option) => option.title}
              onChange={handleSearchChange}
              renderInput={(params) => <TextField {...params} label="Search Movies" variant="outlined" />}
              noOptionsText="No movie"
              sx={{
                backgroundColor: '#d9d9d9',
                borderRadius: '8px',
                width: 300,
                color: '#e83f14',
                zIndex: 1000000,
                "& .MuiInputLabel-root": {
                  display: "none",
                  "& .MuiFormLabel-root ": {
                    color: "#fff",
                  },
                },
                "& .MuiOutlinedInput-root": {
                  zIndex: 1000000,

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#fff",
                    borderRadius: '8px',

                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#fff",
                    borderRadius: '8px',
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#fff",
                    borderRadius: '8px',

                  },
                  color: '#000',

                },
                "& .MuiAutocomplete-option": {
                  // color: '#000',
                  color: '#e83f14',
                }
              }}
            />
          </div>
        </div>
        <Footer />
      </aside>


    </header>
  )
}

export default Header
