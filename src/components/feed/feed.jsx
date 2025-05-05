import React from "react";
import "./feed.css";

const Feed = () => {
  const posts = [
    {
      username: "Existenz.se",
      handle: "@Existenzse",
      time: "2h",
      content:
        "Segerdagsfirandet i Sevastopol blir inställt, detta sker pga säkerhetsläget.",
      comments: 1,
      retweets: 40,
      likes: "5.1K",
      views: "20.3K",
    },
    {
      username: "Karin Andersson",
      handle: "@karin_dev",
      time: "3h",
      content:
        "Idag lärde jag mig hur man skapar en REST API med Express och MongoDB 🙌",
      comments: 4,
      retweets: 12,
      likes: 150,
      views: "8.2K",
    },
    {
      username: "Arch Linux News",
      handle: "@arch_news",
      time: "6h",
      content: "Kernel 6.14.5-arch1-1 is now available in the repos. 🎉",
      comments: 2,
      retweets: 30,
      likes: 380,
      views: "12.6K",
    },
  ];

  return (
    <div className="feed">
      <div className="feed-header">
        <button className="tab active">For you</button>
        <button className="tab">Following</button>
      </div>

      <div className="post-box">
        <textarea placeholder="What's happening?" rows="2" />
        <div className="post-actions">
          <div className="icon-row">
            <button>🖼️</button>
            <button>🎁</button>
            <button>📊</button>
            <button>😊</button>
            <button>📅</button>
          </div>
          <button className="post-button">Post</button>
        </div>
      </div>

      <div className="feed-show-posts">Show 85 posts</div>

      <div className="feed-posts">
        {posts.map((post, index) => (
          <div className="post" key={index}>
            <div className="post-header">
              <strong>{post.username}</strong>{" "}
              <span className="handle-time">
                {post.handle} · {post.time}
              </span>
            </div>
            <p className="post-content">{post.content}</p>
            <div className="post-actions">
              <span>💬 {post.comments}</span>
              <span>🔁 {post.retweets}</span>
              <span>❤️ {post.likes}</span>
              <span>👁️ {post.views}</span>
              <span>📤</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
