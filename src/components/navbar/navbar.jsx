import React from "react";
import "./navbar.css";

const Navbar = () => {
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
            alt="X Logo"
            className="navbar-logo-img"
          />
        </div>
        <nav className="navbar-menu">
          {menu.map((item) => (
            <button key={item.name} className="navbar-item">
              <span className="navbar-icon">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
        <button className="post-button">Post</button>
      </div>
    </div>
  );
};

export default Navbar;
