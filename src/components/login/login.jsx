import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ name: "", password: "" });
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(user);
    navigate("/home");
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
      <Link to="/signup">Sign up</Link>
    </div>
  );
};

export default Login;
