import React, { useState } from "react";

const CommentForm = ({ tweetId, userId, name, username, onCommentAdded }) => {
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/tweet/${tweetId}/comment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            content: commentText,
          }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Kommentar misslyckades: ${text}`);
      }

      const result = await response.json();
      onCommentAdded(result.comment);
      setCommentText("");
      setError(null);
    } catch (err) {
      console.error("Kommentar misslyckades:", err);
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Skriv en kommentar..."
        rows="2"
      />
      <button type="submit">Kommentera</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default CommentForm;
