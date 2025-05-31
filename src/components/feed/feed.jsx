import React, { useState, useEffect } from "react";
import "./feed.css";
import { Link } from "react-router-dom";
import CommentForm from "../comment/CommentForm";

const Feed = () => {
  const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const loggedUser = storedUser?.foundUser;

  const [activeTab, setActiveTab] = useState("forYou");
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({ message: "" });
  const [commentsMap, setCommentsMap] = useState({});
  const [visibleComments, setVisibleComments] = useState({});

  const isTooLong = tweet.message.length > 140;

  useEffect(() => {
    const getTweets = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/tweet/${activeTab}/${loggedUser?._id}`
        );
        const data = await response.json();
        setTweets(data);
      } catch (error) {
        console.error("Fel vid hämtning av tweets:", error);
      }
    };
    getTweets();
  }, [activeTab]);

  const submitTweet = async (e) => {
    e.preventDefault();
    if (tweet.message.length > 140) return;
    const id = loggedUser?._id;
    await fetch(`http://localhost:3000/api/tweet/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([loggedUser, tweet]),
    });
    setTweet({ message: "" });
  };

  const toggleCommentVisibility = (tweetId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [tweetId]: !prev[tweetId],
    }));
  };

  const handleCommentAdded = (tweetId, comment) => {
    setCommentsMap((prev) => ({
      ...prev,
      [tweetId]: [...(prev[tweetId] || []), comment],
    }));

    setTweets((prev) =>
      prev.map((t) =>
        t._id === tweetId
          ? { ...t, comments: [...(t.comments || []), comment] }
          : t
      )
    );
  };

  const timeAgo = (timestamp) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const seconds = Math.floor((now - posted) / 1000);

    if (seconds < 60) return "just nu";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min sedan`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} timme${hours > 1 ? "r" : ""} sedan`;
    const days = Math.floor(hours / 24);
    return `${days} dag${days > 1 ? "ar" : ""} sedan`;
  };

  return (
    <div className="feed">
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
              <span className="icon-button">🖼️</span>
              <span className="icon-button">🎁</span>
              <span className="icon-button">📊</span>
              <span className="icon-button">😊</span>
              <span className="icon-button">📅</span>
            </div>
            <input
              type="submit"
              className="post-button"
              value="Post"
              disabled={isTooLong}
            />
          </div>
        </form>
      </div>

      <div className="feed-show-posts">Show {tweets.length} posts</div>

      <div className="feed-posts">
        {[...tweets]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((tweet, index) => (
            <div className="tweet" key={index}>
              <Link to="/userProfile" state={{ tweet }} className="link-user">
                <div className="tweet-image-box">
                  <img
                    src={tweet.image}
                    className="tweet-image"
                    alt="User avatar"
                  />
                </div>
              </Link>

              <div className="tweet-content">
                <Link to="/userProfile" state={{ tweet }} className="link-user">
                  <div className="post-header">
                    <span className="tweet-name">{tweet.name}</span>{" "}
                    <span className="handle-time">
                      @{tweet.username} · {timeAgo(tweet.createdAt)}
                    </span>
                  </div>
                </Link>
                <p className="tweet-content-text">{tweet.content}</p>
                <div className="tweet-actions">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleCommentVisibility(tweet._id)}
                  >
                    💬{" "}
                    {Array.isArray(tweet.comments) ? tweet.comments.length : 0}
                  </span>
                  <span>🔁 {tweet.retweets}</span>
                  <span>❤️ {tweet.likes}</span>
                </div>

                {visibleComments[tweet._id] && (
                  <>
                    {Array.isArray(tweet.comments) &&
                      tweet.comments.map((comment, idx) => (
                        <div
                          key={idx}
                          style={{
                            paddingLeft: "2rem",
                            paddingTop: "0.5rem",
                            color: "#ccc",
                          }}
                        >
                          💬 <strong>{comment.name}</strong> @{comment.username}
                          : {comment.content}
                        </div>
                      ))}

                    <CommentForm
                      tweetId={tweet._id}
                      userId={loggedUser?._id}
                      name={loggedUser?.name}
                      username={loggedUser?.username}
                      onCommentAdded={(comment) =>
                        handleCommentAdded(tweet._id, comment)
                      }
                    />
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Feed;
