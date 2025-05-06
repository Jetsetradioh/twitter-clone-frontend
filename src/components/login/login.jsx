import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [user, setUser] = useState({ name: "", password: "", loggedIn: false });
  const [toggle, setToggle] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const clickHandler = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/checkUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        setToggle((...prev) => !prev);
      } else {
        setUser({ name: "", password: "" });
        setError(true);
        const data = await response.json();
        console.log(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (resp.ok) {
        console.log("good");
        navigate("/home");
      }
      if (!resp.ok) {
        const data = await resp.json();
        setError(true);
        console.log(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="login-container">
      <img src="https://www.omnicoreagency.com/wp-content/uploads/2015/10/Twitter-Logo.png.webp" alt="twitter" className="login-img" />
      <h2>Logga in på Twitter</h2>

      <form onSubmit={submitHandler}>
        {toggle ? (
          <input
            type="text"
            style={{
              border: error ? "2px solid red" : "1px solid #ccc",
            }}
            placeholder="Username"
            value={user.name}
            onChange={({ target }) => setUser({ ...user, name: target.value })}
          />
        ) : (
          <input
            type="password"
            style={{
              border: error ? "2px solid red" : "1px solid #ccc",
            }}
            placeholder="Password"
            value={user.password}
            onChange={({ target }) =>
              setUser({ ...user, password: target.value })
            }
          />
        )}
        {error ? (
          <span style={{ color: "red" }}>Wrong username or password!</span>
        ) : (
          ""
        )}

        {toggle ? (
          <button type="button" onClick={clickHandler}>
            Nästa
          </button>
        ) : (
          <input type="submit" value="Login"></input>
        )}
      </form>
      <p>Har du inget konto? <Link to="/signup">Sign up</Link></p>
    </div>
  );
};

export default Login;
