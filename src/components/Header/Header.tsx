import { useNavigate, useLocation } from "react-router-dom"
import classNames from "classnames"
import "./Header.scss"
import { useDispatch } from "react-redux"
import { generateRandomNumber } from "../../app/randomNumbersSlice"
import { useAppSelector } from "../../app/hooks"
import { RoutesPath } from "../../utils/enumRouts"

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
    dispatch(generateRandomNumber(movies.length))
    navigate(`${RoutesPath.MOVIE}`)
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
                  active: location.pathname === `/${RoutesPath.TOP_LISTS}`,
                })}
              >
                <a
                  href="#"
                  className="menu-link"
                  onClick={e => handleMenuClick(e, RoutesPath.TOP_LISTS)}
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


// import { useNavigate, useLocation } from "react-router-dom"
// import classNames from "classnames"
// import "./Header.scss"
// import { useDispatch } from "react-redux"
// import { generateRandomNumber } from "../../app/randomNumbersSlice"
// import { useAppSelector } from "../../app/hooks"
// import { RoutesPath } from "../../constants/routes"

// const Header = () => {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const dispatch = useDispatch()
//   const { data: movies, loading } = useAppSelector(state => state.movies) // Get loading state

//   const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
//     if (loading) return // Prevent click if loading
//     e.preventDefault()
//     navigate(`/${target}`)
//   }

//   const handleLuckClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     if (loading) return // Prevent click if loading
//     e.preventDefault()
//     dispatch(generateRandomNumber(movies.length))
//     navigate(`/${RoutesPath.MOVIE}`)
//   }

//   return (
//     <header className="header-page" id="header">
//       <div className="top-bar menu-container--desktop">
//         <a
//           href="#"
//           className={classNames("icons-logo", { disabled: loading })}
//           id="logo"
//           onClick={(e) => handleMenuClick(e, RoutesPath.HOME)}
//         ></a>
//         <div className="menu">
//           <nav>
//             <ul className="menu-list">
//               <li className={classNames("menu-item", { active: location.pathname === RoutesPath.HOME })}>
//                 <a
//                   href="#"
//                   className={classNames("menu-link", { disabled: loading })}
//                   onClick={(e) => handleMenuClick(e, RoutesPath.HOME)}
//                 >
//                   Movie Picker
//                 </a>
//               </li>
//               <li className={classNames("menu-item", { active: location.pathname === `/${RoutesPath.TOP_LISTS}` })}>
//                 <a
//                   href="#"
//                   className={classNames("menu-link", { disabled: loading })}
//                   onClick={(e) => handleMenuClick(e, RoutesPath.TOP_LISTS)}
//                 >
//                   TOP lists
//                 </a>
//               </li>
//               <li className={classNames("menu-item", { active: location.pathname === `/${RoutesPath.GALLERY}` })}>
//                 <a
//                   href="#"
//                   className={classNames("menu-link", { disabled: loading })}
//                   onClick={(e) => handleMenuClick(e, RoutesPath.GALLERY)}
//                 >
//                   Gallery
//                 </a>
//               </li>
//             </ul>
//           </nav>
//         </div>
//         <div className="top-bar-button">
//           <a
//             href="#"
//             className={classNames("top-bar-button--link", { disabled: loading })}
//             onClick={handleLuckClick}
//           >
//             PUSH THE LUCK
//           </a>
//         </div>
//       </div>
//     </header>
//   )
// }

// export default Header
