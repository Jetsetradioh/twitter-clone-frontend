import React, { useState, useEffect } from "react";
import "./tweet.css";

const Tweet = ({ tweets, showInput = false }) => {
  const [newTweet, setNewTweet] = useState("");
  const [allTweets, setAllTweets] = useState(tweets || []);

  useEffect(() => {
    setAllTweets(tweets || []);
  }, [tweets]);

  const handleTweet = () => {
    if (newTweet.trim() === "") return;

    const newTweetObj = {
      name: "Test User",
      username: "testuser",
      time: "just now",
      content: newTweet,
      comments: 0,
      retweets: 0,
      likes: 0,
      image: "https://via.placeholder.com/50",
    };

    setAllTweets([newTweetObj, ...allTweets]);
    setNewTweet("");
  };

  return (
    <div>
      {showInput && (
        <div className="tweet-input-box">
          <textarea
            placeholder="What's happening?"
            value={newTweet}
            onChange={(e) => setNewTweet(e.target.value)}
            data-testid="tweet-textarea"
          />
          <button onClick={handleTweet} data-testid="tweet-button">
            Tweet
          </button>
        </div>
      )}

      <div className="feed-posts">
        {allTweets.map((tweet, index) => (
          <div className="tweet" key={index}>
            <div className="tweet-image-box">
              <img src={tweet.image} className="tweet-image" alt="avatar" />
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

export default Tweet;
