import { useNavigate, useLocation } from "react-router-dom"
import classNames from "classnames"
import "./Header.scss"
import { useDispatch } from "react-redux"
import { generateRandomNumber } from "../../app/randomNumbersSlice"
import { useAppSelector } from "../../app/hooks"
import { RoutesPath } from "../../utils/enumRouts"
import PopoverSearch from "./PopoverSearch/PopoverSearch"

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { data: movies, loading } = useAppSelector(state => state.movies)

  const handleMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string,
  ) => {
    if (loading) {
      return
    }
    e.preventDefault()
    navigate(`${target}`)
    console.log(
      RoutesPath.HOME,

    );

  }

  const handleLuckClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (loading) {
      return
    }
    e.preventDefault()
    console.log(movies.length);

    dispatch(generateRandomNumber((movies.length - 1)))
    navigate(`${RoutesPath.MOVIE}/`)
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
    </header>
  )
}

export default Header
