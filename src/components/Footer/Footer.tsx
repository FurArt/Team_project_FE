import "./Footer.scss"

const Footer = () => {
  return (
    <footer className="footer">
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
