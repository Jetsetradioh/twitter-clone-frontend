import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({ name: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <div>
      <h2>Logga in på Twitter</h2>

      <form onSubmit={submitHandler}>
        <input
          required
          type="text"
          placeholder="Username"
          value={user.name}
          onChange={({ target }) => setUser({ ...user, name: target.value })}
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={({ target }) =>
            setUser({ ...user, password: target.value })
          }
        />
        <input type="submit" placeholder="Login"></input>
      </form>
      <a href="">Sign up</a>
    </div>
  );
};

export default Login;
