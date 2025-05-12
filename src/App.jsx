import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup/signup";
import Sidebar from "./components/sidebar/sidebar";
import Navbar from "./components/navbar/navbar";
import Login from "./components/login/login";
import Feed from "./components/feed/feed";
import Profile from "./components/profile/profile";
import "./App.css";

function HomeLayout({ children }) {
  return (
    <div className="app-layout">
      <div className="navbar">
        <Navbar />
      </div>

      <div className="feed">
        {children} {}
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
        <Route
          path="/home"
          element={
            <HomeLayout>
              <Feed />
            </HomeLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <HomeLayout>
              <Profile />
            </HomeLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
