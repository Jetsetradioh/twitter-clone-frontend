import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = ({ setLoggedUser }) => {
  const [toggle, setToggle] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState({ name: "", password: "" });
  const navigate = useNavigate();

  const clickHandler = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/checkUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        setError(false);
        setToggle((prev) => !prev);
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

  const submitHandler = async () => {
    try {
      const resp = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await resp.json();

      if (resp.ok) {
        setLoggedUser(data);
        localStorage.setItem("loggedUser", JSON.stringify(data));
        setError(false);
        navigate("/home");
      } else {
        setError(true);
        console.log(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const username = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        clickHandler();
      }}
    >
      <input
        type="text"
        style={{
          border: error ? "2px solid red" : "1px solid #ccc",
        }}
        placeholder="Username"
        value={user.name}
        onChange={({ target }) => setUser({ ...user, name: target.value })}
      />
    </form>
  );

  const password = () => (
    <>
      <div className="login-username">{user.name}</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
      >
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
      </form>
    </>
  );

  return (
    <div className="login-container">
      <img
        src="https://www.omnicoreagency.com/wp-content/uploads/2015/10/Twitter-Logo.png.webp"
        alt="twitter"
        className="login-img"
      />
      <h2>Logga in på Twitter</h2>

      <div className="login-form-wrapper">
        {toggle ? username() : password()}
        <div className="login-error-message">
          {error && <span>Wrong username or password!</span>}
        </div>
        <button
          className="login-button"
          type="button"
          onClick={toggle ? clickHandler : submitHandler}
        >
          {toggle ? "Nästa" : "Logga in"}
        </button>
      </div>

      <br />
      <p>
        Har du inget konto? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
