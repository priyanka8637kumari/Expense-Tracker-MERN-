import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSucess } from "../utils";
import TransactionList from "./TransactionList";
import TransactionForm from "./TransactionForm";
import TransactionSummary from "./TransactionSummary";
import profileIcon from "../assets/profileIcon.png";

function Home() {
  // const name = localStorage.getItem("loggedIn user");
  const [loggedInUser, setLoggedInUser] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [expenseAmt, setExpenseAmt] = useState(0);
  const [incomeAmt, setIncomeAmt] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("loggedIn user");
    setLoggedInUser(name);
  }, []);

  useEffect(() => {
    const amounts = transactions.map((transaction) => transaction.amount);
    const income = amounts
      .filter((amount) => amount > 0)
      .reduce((acc, item) => (acc += item), 0);
    setIncomeAmt(income);
    const expense =
      amounts
        .filter((amount) => amount < 0)
        .reduce((acc, item) => (acc += item), 0) * -1;
    setExpenseAmt(expense);
  }, [transactions]);

  const handleLogOut = () => {
    localStorage.removeItem("loggedIn user");
    localStorage.removeItem("userId");

    handleSucess("Logged out successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchTransactions = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const url = "http://localhost:5001/api/transactions/" + userId;
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      setTransactions(data.transactions);
      // console.log("transactions on home page", data.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const userId = localStorage.getItem("userId");
      const url = "http://localhost:5001/api/transactions";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, ...transaction }),
      });
      const data = await response.json();

      if (data.success) {
        handleSucess(data.message);
        setTransactions([...transactions, data.transaction]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTransaction = async (transactionId) => {
    try {
      const userId = localStorage.getItem("userId");
      const url = "http://localhost:5001/api/transactions";
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, transactionId }),
      });
      const data = await response.json();
      if (data.success) {
        handleSucess(data.message);
        const newTransactions = transactions.filter(
          (transaction) => transaction._id !== transactionId
        );
        setTransactions(newTransactions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <div class="grid grid-cols-[250px_auto_400px] gap-5 p-5 bg-gray-500">
      <nav class="bg-white p-5 rounded-lg flex flex-col items-center shadow-md shadow-gray-300">
        <div class="flex flex-row">
          <img
            src={profileIcon}
            alt="User avatar of Mike"
            class="w-15 h-15 rounded-full"
          />
          <div>
            <h1>Welcome {loggedInUser}</h1>
            <p>My Money</p>
          </div>
        </div>
        <button
          onClick={handleLogOut}
          class="mt-auto bg-red-300 text-white border-none py-2 px-5 cursor-pointer rounded-lg"
        >
          Logout
        </button>
      </nav>
      <div class="flex flex-col gap-5">
        <TransactionSummary incomeAmt={incomeAmt} expenseAmt={expenseAmt} />
        <TransactionForm addTransaction={addTransaction} />
      </div>
      <div>
        {/* <h2>Transactions</h2> */}

        <TransactionList
          transactions={transactions}
          deleteTransaction={deleteTransaction}
        />
      </div>
      <ToastContainer />
    </div>

    //   <div>
    //     {" "}
    //     <h1>Welcome {loggedInUser}</h1>
    //     <button onClick={handleLogOut}>Logout</button>
    //     <TransactionSummary
    //     incomeAmt={incomeAmt}
    //     expenseAmt={expenseAmt}
    //     />
    //     <h2>Transactions</h2>
    //   </div>
    //   <TransactionForm addTransaction={addTransaction} />
    //   <TransactionList
    //     transactions={transactions}
    //     deleteTransaction={deleteTransaction}
    //   />

    //   <ToastContainer />
    // </div>
  );
}

export default Home;
