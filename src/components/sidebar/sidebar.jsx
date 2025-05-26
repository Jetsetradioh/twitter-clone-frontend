import React, { useState, useEffect } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";


const initialTrends = [
  { type: "trend", location: "Sweden", topic: "Samt", tweets: "2,840 Tweets" },
  { type: "trend", location: "Politics", topic: "China", tweets: "572K Tweets" },
  { type: "trend", location: "Sweden", topic: "Israel", tweets: "10.2K Tweets" },
  { type: "trend", location: "Sweden", topic: "#babygirl" },
  { type: "trend", location: "Sweden", topic: "Newroz", tweets: "60.4K Tweets" },
];

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [userResults, setUserResults] = useState([]);
  const [trends] = useState(initialTrends);

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchTerm.length === 0) {
        setUserResults([]);
        return;
      }

      try {
        const res = await fetch(`/api/search/users?query=${searchTerm}`);
        const data = await res.json();
        setUserResults(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [searchTerm]);

  const filteredResults = [
    ...trends.filter(
      (item) =>
        item.type === "trend" &&
        item.topic.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    ...userResults.map((user) => ({
      type: "user",
      username: user.username,
      name: user.name,
      profileImage: user.profileImage
    })),
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(value.length > 0);
  };

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-search">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="🔍 Search"
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
                      <div className="user-search-result">
                        <Link to={"/userprofile"} className="user-link">
                          <img
                            src={item.profileImage}
                            alt={item.username}
                            className="user-avatar"
                          />
                          <div className="user-info">
                            <p className="sidebar-topic">{item.username}</p>
                            <p className="user-name">{item.name}</p>
                          </div>
                        </Link>
                      </div>
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

        {trends
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
