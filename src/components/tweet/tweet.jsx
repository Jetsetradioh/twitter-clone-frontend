import React, { useState, useEffect } from "react";
import CommentForm from "../comment/CommentForm";
import "./tweet.css";

const Tweet = ({ tweets, showInput = false }) => {
  const [newTweet, setNewTweet] = useState("");
  const [allTweets, setAllTweets] = useState(tweets || []);
  const [visibleComments, setVisibleComments] = useState({});

  const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const loggedUser = storedUser?.foundUser;

  useEffect(() => {
    setAllTweets(tweets || []);
  }, [tweets]);

  const handleTweet = () => {
    if (newTweet.trim() === "") return;

    const newTweetObj = {
      name: loggedUser?.name || "Test User",
      username: loggedUser?.username || "testuser",
      time: "just nu",
      content: newTweet.trim(),
      comments: [],
      retweets: 0,
      likes: 0,
      image: loggedUser?.profileImage || "https://via.placeholder.com/50",
    };

    setAllTweets([newTweetObj, ...allTweets]);
    setNewTweet("");
  };

  const handleNewComment = (tweetIndex, comment) => {
    const updatedTweets = [...allTweets];
    updatedTweets[tweetIndex].comments.push(comment);
    setAllTweets(updatedTweets);
  };

  const toggleComments = (index) => {
    setVisibleComments((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
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
              <p className="tweet-content-text">{tweet.content}</p>
              <div className="tweet-actions">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleComments(index)}
                >
                  💬 {tweet.comments.length}
                </span>
                <span>🔁 {tweet.retweets}</span>
                <span>❤️ {tweet.likes}</span>
              </div>
            </div>

            {visibleComments[index] && (
              <div className="tweet-comments">
                {tweet.comments?.map((comment, i) => (
                  <p key={i} className="tweet-comment">
                    💬 <strong>{comment.name}</strong> @{comment.username}:{" "}
                    {comment.content}
                  </p>
                ))}

                <CommentForm
                  tweetId={tweet._id}
                  userId={loggedUser?._id}
                  name={loggedUser?.name}
                  username={loggedUser?.username}
                  onCommentAdded={(comment) => handleNewComment(index, comment)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tweet;
