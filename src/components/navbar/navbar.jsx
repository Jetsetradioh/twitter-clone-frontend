import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("Home");
  const [showLogout, setShowLogout] = useState(false);

  //  Get the logged-in user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const loggedUser = storedUser?.foundUser;

  const menu = [
    { name: "Home", icon: "🏠", path: "/home" },
    { name: "Explore", icon: "🔍" },
    { name: "Notifications", icon: "🔔" },
    { name: "Messages", icon: "✉️" },
    { name: "Bookmarks", icon: "🔖" },
    { name: "Lists", icon: "📋" },
    { name: "Profile", icon: "👤", path: "/profile" },
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
          {menu.map((item) =>
            item.path ? (
              <Link
                to={item.path}
                key={item.name}
                className={`navbar-item ${
                  activeItem === item.name ? "active" : ""
                }`}
                onClick={() => setActiveItem(item.name)}
              >
                <span className="navbar-icon">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ) : (
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
            )
          )}
        </nav>
        <button className="post-button">Post</button>
      </div>
      <div className="navbar-profile">
        <img
          src={
            loggedUser?.profileImage ||
            "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
          }
          alt="profile"
          className="navbar-profile-img"
        />
        <Link to="/profile" className="nav-profile-dots">
          <div className="navbar-profile-info">
            <span className="navbar-profile-name">
              {loggedUser?.name || "Guest"}
            </span>
            <span className="navbar-profile-username">
              @{loggedUser?.username || "guest"}
            </span>
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
                <button
                  className="logout-btn logout-confirm"
                  onClick={() => {
                    localStorage.removeItem("loggedUser");
                    window.location.href = "/";
                  }}
                >
                  Log out
                </button>
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
