import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import "./Navbar.css";
import BlurText from "../blurtext/blur";
const Navbar = () => {
  const [over, setover] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Services", path: "/services" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Blog", path: "/blog" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo + Text */}
        <Link to="/" className="logo cursor-target" onMouseOver={() => setover(true)} onMouseOut={() => setover(false)}>
          <img src={over ? "/plogo.svg" : "/whitelogo.png"} alt="Logo" className="logo-img" width={50} height={50} />
          <span className="logo-text">Socialsect</span>
        </Link>

        {/* Nav Links */}
        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          {/* Close button for mobile */}
          <button 
            className="mobile-close-btn cursor-target"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="nav-link cursor-target"
              onClick={() => setIsMenuOpen(false)}
            >

              {item.name}

            </Link>
          ))}
        </div>

        {/* Let's Build Button */}
        <div className="build-button">
          <Link to="/lets-build" className="build-link cursor-target" onClick={() => setIsMenuOpen(false)}>
            <BlurText
              text="Let's Build"
              delay={150}
              animateBy="words"
              direction="top"
              className="build-text"
            />
          </Link>
        </div>

        {/* Hamburger for mobile */}
        <button
          className={`hamburger cursor-target ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
