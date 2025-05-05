import { useState } from "react";
import "./login.css";

const Login = () => {
  const [user, setUser] = useState({ name: "", password: "", loggedIn: false });
  const [toggle, setToggle] = useState(true);

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
    } else {
      const message = await response.json();
      console.log(message.message);
    }
  };

  return (
    <div>
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
      <a href="">Sign up</a>
    </div>
  );
};

export default Login;
