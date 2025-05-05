import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup/signup";
import Sidebar from "./components/sidebar/sidebar";
import Navbar from "./components/navbar/navbar";
import Login from "./components/login/login";

function Home() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <h2>Välkommen till startsidan!</h2>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
