import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'; 
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import './App.css';
import Navbar from './components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from "js-cookie";
import { initializeAnalytics, trackPageView } from "./analytics"; 
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    initializeAnalytics();
    console.log("Analytics initialized");
    trackPageView(window.location.pathname);
    console.log(`Page view tracked: ${window.location.pathname}`);
  }, []);

  const handleLogOut = () => {
    //localStorage.removeItem("loggedIn user");
    Cookies.remove("loggedInUser");
    Cookies.remove("userId");
    //localStorage.removeItem("userId");

    toast.success("Logged out successfully!");
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
      {/* <h1>Expense Tracker</h1> */}
    </div>
  );
}

export default App;