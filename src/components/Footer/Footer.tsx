import { useLocation, } from "react-router-dom"
import "./Footer.scss"
import { useEffect } from "react";

const Footer = () => {
  const location = useLocation();
  const { pathname } = location
  const isPickerPage = location.pathname === '/picker/';
  return (
    <footer className="footer" style={isPickerPage ? { margin: '26vh 0 0' } : {}}>
      <div className="footer-container">
        <div className="footer-logo"></div>
        <div>
          <ul className="footer-menu">
            <li className="footer-menu-item">
              <a href="#" className="footer-menu-link">Contact us</a>
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
