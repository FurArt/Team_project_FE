import "./Header.scss"

const Header = () => {
  return (
    <header className="header-page" id="header">
      <div className="top-bar menu-container--desktop">
        <a href="#" className="icons-logo" id="logo"></a>
        <div className="menu">
          <nav>
            <ul className="menu-list">
              <li className="menu-item active">
                <a href="#" className="menu-link">
                  Movie Picker
                </a>
              </li>
              <li className="menu-item">
                <a href="#" className="menu-link">
                  TOP lists
                </a>
              </li>
              <li className="menu-item">
                <a href="#" className="menu-link">
                  Gallery
                </a>
              </li>
              <li className="menu-item">
                <a href="#" className="menu-link menu-link--language"></a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="top-bar-control">
          <a href="#" className="top-bar-control-search"></a>
          <a href="#" className="top-bar-control-lenguage"></a>
        </div>
        <div className="top-bar-button">
          <a href="#" className="top-bar-button--link">
            PUSH THE LUCK
          </a>
        </div>
      </div>

      <div className="top-bar menu-container--table">
        <a href="#" className="icons-logo"></a>
        <a href="#menu-aside-active" className="icons icons--menu"></a>
      </div>

      <aside className="menu-aside menu-aside-active" id="menu-aside-active">
        <div className="menu-aside-full">
          <a href="#" className="icons-logo"></a>
          <a href="#" className="icons icons--close"></a>
        </div>

        <ul className="menu-list">
          <li className="menu-item">
            <a href="#" className="menu-link">
              Movie Picker
            </a>
          </li>
          <li className="menu-item">
            <a href="#" className="menu-link">
              TOP lists
            </a>
          </li>
          <li className="menu-item">
            <a href="#" className="menu-link">
              Gallery
            </a>
          </li>
        </ul>
      </aside>
    </header>
  )
}

export default Header
