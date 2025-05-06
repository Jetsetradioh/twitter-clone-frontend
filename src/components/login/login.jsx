import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [user, setUser] = useState({ name: "", password: "", loggedIn: false });
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const acctiveUser = await response.json();
      console.log("Inloggad: ", acctiveUser);
      navigate("/home");
    } else {
      const message = await response.json();
      console.log(message.message);
      setUser({ name: "", password: "" });
      setToggle(true);
    }
    console.log(user);
  };

  return (
    <div className="login-container">
      <img src="https://www.omnicoreagency.com/wp-content/uploads/2015/10/Twitter-Logo.png.webp" alt="twitter" className="login-img" />
      <h2>Logga in på Twitter</h2>

      <form onSubmit={submitHandler}>
        {toggle ? (
          <input
            type="text"
            placeholder="Username"
            value={user.name}
            onChange={({ target }) => setUser({ ...user, name: target.value })}
          />
        ) : (
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={({ target }) =>
              setUser({ ...user, password: target.value })
            }
          />
        )}
        {toggle ? (
          <button onClick={() => setToggle((...prev) => !prev)}>Nästa</button>
        ) : (
          <input type="submit" value="Login"></input>
        )}
      </form>
      <p>Har du inget konto? <Link to="/signup">Sign up</Link></p>
    </div>
  );
};

export default Login;
