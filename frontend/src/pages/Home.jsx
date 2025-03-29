import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSucess } from "../utils";

function Home() {
  // const name = localStorage.getItem("loggedIn user");
  const [loggedInUser, setLoggedInUser] = useState("");
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("loggedIn user");
    setLoggedInUser(name);
  });

  const handleLogOut = () => {
    localStorage.removeItem("loggedIn user");
    handleSucess("Logged out successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchTransactions = async () => {
    try {
    const url = "http://localhost:3001/api/transactions";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setTransactions(data);

  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchTransactions();
    }, []);
  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogOut}>Logout</button>
        <h2>Transactions</h2>
        <div>
            {transactions.map((transaction) => (
                <div key={transaction._id}>
               <span>{transaction.text} : {transaction.amount}</span>
                </div>
            ))}
        </div>
        <ToastContainer />
    </div>
  );
}

export default Home;
