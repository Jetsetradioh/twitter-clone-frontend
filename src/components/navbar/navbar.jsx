import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("Home");
  const [showLogout, setShowLogout] = useState(false);

  const menu = [
    { name: "Home", icon: "🏠" },
    { name: "Explore", icon: "🔍" },
    { name: "Notifications", icon: "🔔" },
    { name: "Messages", icon: "✉️" },
    { name: "Bookmarks", icon: "🔖" },
    { name: "Lists", icon: "📋" },
    { name: "Profile", icon: "👤" },
    { name: "More", icon: "⋯" },
  ];

  return (
    <div className="navbar">
      <div className="navbar-top">
        <div className="navbar-logo">
          <img
            src="https://www.omnicoreagency.com/wp-content/uploads/2015/10/Twitter-Logo.png.webp"
            alt="twitter logo"
            className="navbar-logo-img"
          />
        </div>
        <nav className="navbar-menu">
          {menu.map((item) => (
            <button
              key={item.name}
              className={`navbar-item ${
                activeItem === item.name ? "active" : ""
              }`}
              onClick={() => setActiveItem(item.name)}
            >
              <span className="navbar-icon">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
        <button className="post-button">Post</button>
      </div>
      <div className="navbar-profile">
        <img
          src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
          alt="profile"
          className="navbar-profile-img"
        />
        <Link to="/profile" className="nav-profile-dots">
          <div className="navbar-profile-info">
            <span className="navbar-profile-name">Mackan_131</span>
            <span className="navbar-profile-username">@131Mackan</span>
          </div>
        </Link>
        <span
          className="navbar-profile-dots"
          onClick={() => setShowLogout(!showLogout)}
        >
          ⋯
        </span>
        {showLogout && (
          <div
            className="logout-modal-overlay"
            onClick={() => setShowLogout(false)}
          >
            <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
              <img
                src="https://www.omnicoreagency.com/wp-content/uploads/2015/10/Twitter-Logo.png.webp"
                alt="Twitter Logo"
                className="logout-logo"
              />
              <h3 className="logout-title">Log out of Twitter?</h3>
              <div className="logout-buttons">
                <Link to="/." className="logout-btn logout-confirm">
                  Log out
                </Link>
                <button
                  onClick={() => setShowLogout(false)}
                  className="logout-btn logout-cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
