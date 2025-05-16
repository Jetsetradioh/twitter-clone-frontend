import React, { useEffect, useState } from "react";
import "./tweet.css";

const Tweet = ({ tweets }) => {
  return (
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
  );
};

export default Tweet;
