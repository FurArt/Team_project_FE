import { useLocation, } from "react-router-dom"
import "./Footer.scss"
import { useEffect } from "react";

const Footer = () => {
  const location = useLocation();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo"></div>
        <div>
          <ul className="footer-menu">
            <li className="footer-menu-item">
              <a href="#" className="footer-menu-link">ABOUT us</a>
            </li>
            <li className="footer-menu-item">
              <a href="#" className="footer-menu-link">FAQ</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
