import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup/signup";
import Sidebar from "./components/sidebar/sidebar";
import Navbar from "./components/navbar/navbar";
import Login from "./components/login/login";
import Feed from "./components/feed/feed";
import Profile from "./components/profile/profile";
import { useEffect, useState } from "react";
import Tweet from "./components/tweet/tweet";
import "./App.css";

function HomeLayout({ children }) {
  return (
    <div className="app-layout">
      <div className="navbar">
        <Navbar />
      </div>

      <div className="feed">
        {children} {/* Här visas Feed eller Profile beroende på route */}
      </div>

      <div className="sidebar">{/*<Sidebar />*/}</div>
    </div>
  );
}

function App() {
  const [loggedUser, setLoggedUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (loggedUser) {
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    }
  }, [loggedUser]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setLoggedUser={setLoggedUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <HomeLayout>
              <Feed loggedUser={loggedUser} />
            </HomeLayout>
          }
        />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/profile"
          element={
            <HomeLayout>
              <Profile loggedUser={loggedUser} />
            </HomeLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
