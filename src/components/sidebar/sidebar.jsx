import React, { useState, useEffect } from "react";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [userResults, setUserResults] = useState([]);
  const [trends, setTrends] = useState([]);

  const navigate = useNavigate();

  const normalize = (str) => str.replace(/^#/, "").toLowerCase();

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await fetch("/api/tweet/trends");
        const data = await res.json();
        setTrends(data);
      } catch (err) {
        console.error("Error fetching trends:", err);
      }
    };

    fetchTrends();
  }, []);

  // Fetch users on search term
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

  const filteredTrends = trends.filter((trend) =>
    normalize(trend.topic).startsWith(normalize(searchTerm))
  );

  const filteredResults = [
    ...filteredTrends.map((trend) => ({
      ...trend,
      type: "trend",
    })),
    ...userResults.map((user) => ({
      type: "user",
      username: user.username,
      name: user.name,
      profileImage: user.profileImage,
      userId: user._id,
    })),
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(value.length > 0);
  };

  const handleUserClick = (userId) => {
    navigate("/userProfile", {
      state: { tweet: { userId } },
    });
    setSearchTerm("");
    setShowDropdown(false);
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
                  <div key={idx} className="sidebar-trend dropdown-item">
                    {item.type === "user" ? (
                      <div
                        className="user-link"
                        onClick={() => handleUserClick(item.userId)}
                      >
                        <div className="user-search-result">
                          <img
                            src={item.profileImage}
                            alt={item.username}
                            className="user-avatar"
                          />
                          <div className="user-info">
                            <p className="sidebar-topic">{item.username}</p>
                            <p className="user-name">{item.name}</p>
                          </div>
                        </div>
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
              <p className="sidebar-topic">#{item.topic}</p>
              {item.tweets && <p className="sidebar-tweets">{item.tweets}</p>}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
