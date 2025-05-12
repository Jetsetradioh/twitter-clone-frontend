import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Signup from "./components/signup/signup";
import Sidebar from "./components/sidebar/sidebar";
import Navbar from "./components/navbar/navbar";
import Login from "./components/login/login";
import Home from "./components/home/home";
import Feed from "./components/feed/feed";
import "./App.css";
import Profile from "./components/profile/profile";
import { useEffect, useState } from "react";

function HomeLayout({ loggedUser }) {
  return (
    <div className="app-layout">
      <div className="navbar">
        <Navbar />
      </div>

      <div className="feed">
        <Feed></Feed>
      </div>

      <div className="sidebar">
        <Sidebar />
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState({ name: "", password: "" });
  const [loggedUser, setLoggedUser] = useState();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Login
              setUser={setUser}
              user={user}
              setLoggedUser={setLoggedUser}
            />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomeLayout loggedUser={loggedUser} />} />
        <Route
          path="/profile"
          element={<Profile loggedUser={loggedUser} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
