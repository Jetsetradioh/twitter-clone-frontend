import React, { useState, useEffect } from "react";
import "./feed.css";
import { Link } from "react-router-dom";

const Feed = () => {
  const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const loggedUser = storedUser?.foundUser;

  const [activeTab, setActiveTab] = useState("forYou");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const getTweets = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/tweet/${activeTab}/${loggedUser?._id}`
        );
        const data = await response.json();
        setTweets(data);
      } catch {}
    };
    getTweets();
  }, [activeTab, loggedUser?._id]);

  const [tweet, setTweet] = useState({ message: "" });

  const submitTweet = async (e) => {
    e.preventDefault();
    if (tweet.message.length > 140) return; // prevent submitting if too long
    const id = loggedUser?._id;
    const response = await fetch(`http://localhost:3000/api/tweet/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([loggedUser, tweet]),
    });
  };

  const isTooLong = tweet.message.length > 140;

  return (
    <div className="feed">
      {/* Tabs */}
      <div className="feed-header">
        <button
          className={`tab ${activeTab === "forYou" ? "active" : ""}`}
          onClick={() => setActiveTab("forYou")}
        >
          For you
        </button>
        <button
          className={`tab ${activeTab === "following" ? "active" : ""}`}
          onClick={() => setActiveTab("following")}
        >
          Following
        </button>
      </div>

      {/* Post box */}
      <div className="post-box">
        <form onSubmit={submitTweet}>
          <textarea
            placeholder="What's happening?"
            rows="2"
            value={tweet.message}
            onChange={(e) => setTweet({ message: e.target.value })}
            className={isTooLong ? "error" : ""}
          />
          <div className="post-actions">
            <div className="icon-row">
              <button className="icon-button">🖼️</button>
              <button className="icon-button">🎁</button>
              <button className="icon-button">📊</button>
              <button className="icon-button">😊</button>
              <button className="icon-button">📅</button>
            </div>
            <input type="submit" className="post-button" value="Post" disabled={isTooLong} />
          </div>
        </form>
      </div>

      {/* Tweets list */}
      <div className="feed-show-posts">Show {tweets.length} posts</div>

      <div className="feed-posts">
        {tweets.map((tweet, index) => (
          <div className="tweet" key={index}>
            <Link to="/userProfile" state={{ tweet }} className="link-user">
              <div className="tweet-image-box">
                <img src={tweet.image} className="tweet-image" alt="User avatar" />
              </div>
            </Link>

            <div className="tweet-content">
              <Link to="/userProfile" state={{ tweet }} className="link-user">
                <div className="post-header">
                  <span className="tweet-name">{tweet.name}</span>{" "}
                  <span className="handle-time">
                    @{tweet.username} {tweet.time}
                  </span>
                </div>
              </Link>
              <p className="tweet-content-text">{tweet.content}</p>
              <div className="tweet-actions">
                <span>💬 {tweet.comments.length}</span>
                <span>🔁 {tweet.retweets}</span>
                <span>❤️ {tweet.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
