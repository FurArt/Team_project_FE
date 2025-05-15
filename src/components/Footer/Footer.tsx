import { NavLink, useNavigate } from "react-router-dom"
import "./Footer.scss"
import { useEffect } from "react"
import { RoutesPath } from "../../utils/enumRouts"
import { scrollToHandler } from "../../utils/scrollToHandler"

const Footer = () => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    scrollToHandler(null)
    navigate(`/${RoutesPath.ABOUTUS}`)
  }
  return (
    <footer className="footer">
      <div className="footer-container">
        <NavLink
          to={RoutesPath.HOME}
          onClick={() => scrollToHandler(null)}
        >
          <div className="footer-logo">

          </div>
        </NavLink>
        <div>
          <nav className="footer-menu">
            <a className="footer-menu-link" onClick={handleNavigate}>
              About Us
            </a>
            {/* <a href="#" >About Us</a> */}
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
