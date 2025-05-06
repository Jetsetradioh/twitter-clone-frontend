import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registrering klar", formData);
    // plats för API-anrop sen

    navigate("/");
  };

  return (
    <div className="signup-container">
      <img src="https://www.omnicoreagency.com/wp-content/uploads/2015/10/Twitter-Logo.png.webp" alt="twitter" className="login-img" />
      <h2>Registrera dig</h2>
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
        <button type="submit">Skapa konto</button>
      </form>
      <br/>
      <Link to="/.">Gå tillbaka</Link>
    </div>
  );
};

export default Signup;
