import React, { useState } from "react";
import "./feed.css";

const Feed = () => {
  // Håller reda på vilken tabb som är aktiv (For you eller Following)
  const [activeTab, setActiveTab] = useState("forYou");

  // Hårdkodade inlägg som visas i flödet
  const posts = [
    {
      username: "Existenz.se",
      handle: "@Existenzse",
      time: "2h",
      content: `"10:00 — Teamet samlas, alla peppade.\n\n14:00 — Max: 'Ska bara till tandläkaren...'\n14:01 — ✨ Offline forever ✨\n\n17:00 — Filip: 'Snart tillbaka!'\n17:01 — Witness Protection Program?\n\n00:00 — Adam: Typing like it's a boss fight 💥💻\n\nMoral of the story: Trust nobody. Especially tandläkare och 'snart tillbaka'."`,
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
        <textarea placeholder="What's happening?" rows="2" />
        <div className="post-actions">
          <div className="icon-row">
            <button className="icon-button">🖼️</button>
            <button className="icon-button">🎁</button>
            <button className="icon-button">📊</button>
            <button className="icon-button">😊</button>
            <button className="icon-button">📅</button>
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
