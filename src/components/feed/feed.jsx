import React, { useState, useEffect } from "react";
import "./feed.css";

const Feed = () => {
  const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const loggedUser = storedUser?.foundUser;

  // Håller reda på vilken tabb som är aktiv (For you eller Following)
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
  }, []);

  const [tweet, setTweet] = useState({ message: "" });

  const submitTweet = async (e) => {
    e.preventDefault();
    const id = loggedUser?._id;
    const response = await fetch(`http://localhost:3000/api/tweet/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([loggedUser, tweet]),
    });
  };

  return (
    <div className="feed">
      {/* Tabb för att växla mellan 'For you' och 'Following' */}
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

      {/* Posta nytt inlägg */}
      <div className="post-box">
        <form onSubmit={submitTweet}>
          <textarea
            placeholder="What's happening?"
            rows="2"
            value={tweet.message}
            onChange={(e) => {
              setTweet({ message: e.target.value });
            }}
          />

          <div className="post-actions">
            <div className="icon-row">
              <button className="icon-button">🖼️</button>
              <button className="icon-button">🎁</button>
              <button className="icon-button">📊</button>
              <button className="icon-button">😊</button>
              <button className="icon-button">📅</button>
            </div>
            <input type="submit" className="post-button" value="Post" />
          </div>
        </form>
      </div>

      <div className="feed-show-posts">Show 85 posts</div>

      <div className="feed-posts">
        {tweets.map((tweet, index) => (
          <div className="tweet" key={index}>
            <div className="tweet-image-box">
              <img src={tweet.image} className="tweet-image"></img>
            </div>
            <div className="tweet-content">
              <div className="post-header">
                <span className="tweet-name">{tweet.name}</span>{" "}
                <span className="handle-time">
                  @{tweet.username} {tweet.time}
                </span>
              </div>
              <p>{tweet.content}</p>
              <div className="tweet-actions">
                <span>💬 {tweet.comments}</span>
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
