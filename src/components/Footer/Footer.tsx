import { NavLink, useLocation } from "react-router-dom"
import "./Footer.scss"
import { useEffect } from "react"
import { RoutesPath } from "../../utils/enumRouts"

const Footer = () => {
  const location = useLocation()

  return (
    <footer className="footer">
      <div className="footer-container">
          <NavLink
            to={RoutesPath.HOME}
          >
        <div className="footer-logo">

        </div>
          </NavLink>
        <div>
          <nav className="footer-menu">
            <NavLink className="footer-menu-link" to={RoutesPath.ABOUTUS}>
              {" "}
              About Us{" "}
            </NavLink>
            {/* <a href="#" >About Us</a> */}
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
