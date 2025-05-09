import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup/signup";
import Sidebar from "./components/sidebar/sidebar";
import Navbar from "./components/navbar/navbar";
import Login from "./components/login/login";
import Home from "./components/home/home";
import Feed from "./components/feed/feed";
import "./App.css";
import Profile from "./components/profile/profile";

function HomeLayout() {
  return (
    <div className="app-layout">
      <div className="navbar">
        <Navbar />
      </div>

      <div className="feed">
        <Profile />
        <Feed></Feed>
      </div>

      <div className="sidebar">
        <Sidebar />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomeLayout />} />
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
