import React, { useEffect, useState } from "react";

const Tweet = ({ tweets }) => {
  const [userTweets, setUserTweets] = useState({});

  return (
    <div className="feed-posts">
      {tweets.map((tweet, index) => (
        <div className="post" key={index}>
          <div className="post-header">
            <strong>{tweet.name}</strong>{" "}
            <span className="handle-time">
              {tweet.username} {tweet.time}
            </span>
          </div>
          <p className="post-content">{tweet.content}</p>
          <div className="post-actions">
            <span>💬 {tweet.comments}</span>
            <span>🔁 {tweet.retweets}</span>
            <span>❤️ {tweet.likes}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tweet;
