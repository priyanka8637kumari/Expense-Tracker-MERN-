import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'; 
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import './App.css';
import Navbar from './components/Navbar';
import Cookies from "js-cookie";
import { initializeAnalytics, trackPageView } from "./analytics"; 
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();

  //Google Analytics and tracking
  useEffect(() => {
    initializeAnalytics();
    trackPageView(window.location.pathname);
  }, []);

  // Handle logout function
  const handleLogOut = () => {
    Cookies.remove("loggedInUser");
    Cookies.remove("userId");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  return (
    <div className="App">
  
      <Navbar handleLogOut={handleLogOut}/>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      
    </div>
  );
}

export default App;