import { useNavigate, useLocation } from "react-router-dom"
import classNames from "classnames"
import "./Header.scss"
import { generateRandomNumber } from "../../app/randomNumbersSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { RoutesPath } from "../../utils/enumRouts"
import PopoverSearch from "./PopoverSearch/PopoverSearch"
import { useState } from "react"
import { scrollToHandler } from "../../utils/scrollToHandler"
import Footer from "../Footer/Footer"
import { Autocomplete, TextField } from "@mui/material"
import { MovieData } from "../../types/movie"
import { Input } from "@base-ui-components/react"
import { fetchMovieByLuck } from "../../app/store"

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { data: movies, loading } = useAppSelector(state => state.movies)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchMovie, setSearchMovies] = useState<MovieData | null>(null);
  const [search, setSearch] = useState("")


  const closeMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsMenuOpen(false)
  };

  const handleMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    if (loading) return;
    e.preventDefault();
    navigate(target);
    closeMenu(e);
    scrollToHandler(null)
  };


  const handleLuckClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (loading) {
      return
    }
    e.preventDefault()

    dispatch(fetchMovieByLuck(1))
    navigate(`../${RoutesPath.MOVIE}/`)
    closeMenu(e);
    scrollToHandler(null);

  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleEndSearch = () => {
  }

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
          <a href="#" className="icons icons--close" onClick={(e) => closeMenu(e)}></a>
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

        </div>
        <div className="search">
          <Input
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
            onKeyUp={e => {
              if (e.key === "Enter") {
                handleEndSearch()
              }
            }}
            className="search-input"
            data-filled={search ? "true" : undefined}
            render={(props, state) => (
              <div className="input-wrapper">
                <input {...props} className="gallery-header-search-input" />
                <span
                  className="search-icon"
                  onClick={handleEndSearch}
                ></span>
              </div>
            )}
          />
        </div>
        <Footer />
      </aside>


    </header>
  )
}

export default Header

