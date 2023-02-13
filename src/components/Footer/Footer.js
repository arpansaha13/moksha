import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="sec branding">
          <img className="footer-logo" src="/images/icons/logo.png" alt="" />

          <div className="foot-address">
            The Corporate Park, 8th Floor, Plot No-14/15 ,Sector -18, Vashi, Navi Mumbai Maharashtra
            400703
          </div>

          <div className="social-icons">
            <a href="/">
              <img src="/images/icons/facebook.svg" />
            </a>
            <a href="/">
              <img src="/images/icons/instagram.svg" />
            </a>
            <a href="/">
              <img src="/images/icons/linkedln.svg" />
            </a>
          </div>

          <div className="rights">2016-22 StockTick. All rights reserved</div>
        </div>

        <div className="sec products">
          <div className="sec-heading">PRODUCTS</div>
          <ul>
            <li>
              <Link to="/mutual_funds">Mutual Funds</Link>
            </li>
            <li>
              <Link to="/insurance">Insurance</Link>
            </li>
            <li>
              <Link to="/loans">Loan</Link>
            </li>
            <li>
              <Link to="/education">Education</Link>
            </li>
            <li>
              <Link to="/">Asset Management</Link>
            </li>
          </ul>
        </div>

        <div className="sec company">
          <div className="sec-heading">COMPANY</div>
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/">Blog</Link>
            </li>
            <li>
              <Link to="/media">Media</Link>
            </li>
            <li>
              <Link to="/">Help and Support</Link>
            </li>
            <li>
              <Link to="/privacypolicy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-of-use">Terms and Conditions</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="sec quicklinks">
          <div className="sec-heading">QUICK LINKS</div>
          <ul>
            <li>
              <Link to="/mutual_funds/calculators">Calculators</Link>
            </li>
            <li>
              <Link to="/">Glossary</Link>
            </li>
            <li>
              <Link to="/">Open Demat Account</Link>
            </li>
          </ul>
        </div>

      
      </div>
    </div>
  );
}

export default Footer;
