import { NavLink, useNavigate } from "react-router-dom"
import "./Footer.scss"
import { useEffect } from "react"
import { RoutesPath } from "../../utils/enumRouts"

const Footer = () => {
  const navigate = useNavigate()

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
            <a className="footer-menu-link" onClick={() => navigate(`/${RoutesPath.ABOUTUS}`)}>
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
