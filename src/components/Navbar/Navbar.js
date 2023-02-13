/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


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
          <img src={click ? "./images/icons/close.png" : "./images/icons/menu.png"} />
        </div>

         
            
               
        
        

        

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>


          <li className="nav-item">
            <Link to="/timeline" className="nav-links" onClick={closeMobileMenu}>
              Timeline
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/events" className="nav-links" onClick={closeMobileMenu}>
              Events 
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/faqs" className="nav-links" onClick={closeMobileMenu}>
              FAQS
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/sponsors" className="nav-links" onClick={closeMobileMenu}>
              Sponsors 
            </Link>
          </li>

          

          <li className="nav-item">
            <Link to="/profile" className="nav-links" onClick={closeMobileMenu}>
              Profile 
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
              SIGN UP/LOGIN  
            </Link>
          </li>

        </ul>

        
      </div>
    </nav>
  );
}

export default Navbar;
