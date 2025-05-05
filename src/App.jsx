import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup/signup";
import Sidebar from "./components/sidebar/sidebar";
import Navbar from "./components/navbar/navbar";
import Login from "./components/login/login";
import Home from "./components/home/home"; 
import Feed from "./components/feed/feed";
import "./App.css"; 

function HomeLayout() {
  return (
    <div className="app-layout">
      <div className="navbar">
        <Navbar />
      </div>

      <div className="feed">
        <Feed />
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
      </Routes>
    </Router>
  );
}

export default App;

