/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const tabs = [
  {
    to: '/',
    name: 'Home',
  },
  {
    to: '/timeline',
    name: 'Timeline',
  },
  {
    to: '/events',
    name: 'Events',
  },
  {
    to: '/faqs',
    name: 'FAQs',
  },
  {
    to: '/sponsors',
    name: 'Sponsors',
  },
  {
    to: '/profile',
    name: 'Profile',
  },
  {
    to: '/auth/login',
    name: 'Login',
  },
  {
    to: '/auth/signup',
    name: 'Sign up',
  },
]

function Navbar() {
  const [click, setClick] = useState(false);

  const [button, setButton] = useState(true);
  const [navbar, setNavbar] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener("resize", showButton);

  const changeBackground = () => {
    if (window.scrollY >= 47) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  return (
    <nav className={navbar ? "navbar active" : "navbar"}>
      <div className="navbar-container">
        {/* <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>

        </Link> */}

        <div className="menu-icon" onClick={handleClick}>
          <img src={click ? "./images/icons/close.png" : "./images/icons/menu.png"} alt='' />
        </div>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          {
            tabs.map(tab => (
            <li key={tab.to} className="nav-item">
              <Link to={tab.to} className="nav-links" onClick={closeMobileMenu}>
                { tab.name }
              </Link>
            </li>
            ))
          }
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
