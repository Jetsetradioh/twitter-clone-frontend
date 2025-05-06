import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    verifyPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Kontrollera att lösenorden matchar
    if (formData.password !== formData.verifyPassword) {
      setError("Lösenorden matchar inte");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Något gick fel vid registrering");
      }

      // Vid lyckad registrering, navigera till login-sidan
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <img
        src="https://www.omnicoreagency.com/wp-content/uploads/2015/10/Twitter-Logo.png.webp"
        alt="twitter"
        className="login-img"
      />
      <h2>Registrera dig</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Användarnamn"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-post"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Lösenord"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="verifyPassword"
          placeholder="Verifiera lösenord"
          value={formData.verifyPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Skapa konto</button>
      </form>

      <p>
        Redan registrerad? <Link to="/">Logga in här</Link>
      </p>
    </div>
  );
};

export default Signup;
