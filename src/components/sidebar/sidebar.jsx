import React, { useState } from "react";
import "./sidebar.css";

const initialTrends = [
  { type: "trend", location: "Sweden", topic: "Samt", tweets: "2,840 Tweets" },
  { type: "trend", location: "Politics", topic: "China", tweets: "572K Tweets" },
  { type: "trend", location: "Sweden", topic: "Israel", tweets: "10.2K Tweets" },
  { type: "trend", location: "Sweden", topic: "#babygirl" },
  { type: "trend", location: "Sweden", topic: "Newroz", tweets: "60.4K Tweets" },
  { type: "user", username: "@elonmusk" },
  { type: "user", username: "@nasa" },
];

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredResults = initialTrends.filter((item) => {
    const term = searchTerm.toLowerCase();
    if (item.type === "user") {
      return item.username.toLowerCase().includes(term);
    } else if (item.type === "trend") {
      return item.topic.toLowerCase().includes(term);
    }
    return false;
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(value.length > 0);
  };

  const handleSelect = (value) => {
    setSearchTerm(value);
    setShowDropdown(false);
  };

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-search">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="🔍Search"
            className="sidebar-search-input"
            value={searchTerm}
            onChange={handleInputChange}
          />

          {showDropdown && (
            <div className="dropdown">
              {filteredResults.length === 0 ? (
                <div className="sidebar-trend">
                  <p className="sidebar-topic">No results found</p>
                </div>
              ) : (
                filteredResults.map((item, idx) => (
                  <div
                    key={idx}
                    className="sidebar-trend dropdown-item"
                    onClick={() =>
                      handleSelect(
                        item.type === "user" ? item.username : item.topic
                      )
                    }
                  >
                    {item.type === "user" ? (
                      <p className="sidebar-topic">{item.username}</p>
                    ) : (
                      <>
                        <p className="sidebar-meta">
                          {item.location} · Trending{" "}
                          <span className="sidebar-dots">⋯</span>
                        </p>
                        <p className="sidebar-topic">{item.topic}</p>
                        {item.tweets && (
                          <p className="sidebar-tweets">{item.tweets}</p>
                        )}
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className="sidebar-sidebar">
        <h3 className="sidebar-title">Trends for you</h3>

        {initialTrends
          .filter((item) => item.type === "trend")
          .map((item, index) => (
            <div className="sidebar-trend" key={index}>
              <p className="sidebar-meta">
                {item.location} · Trending{" "}
                <span className="sidebar-dots">⋯</span>
              </p>
              <p className="sidebar-topic">{item.topic}</p>
              {item.tweets && (
                <p className="sidebar-tweets">{item.tweets}</p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
