import { Routes, Route, Navigate } from 'react-router-dom'; 
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
  
      <Navbar />
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