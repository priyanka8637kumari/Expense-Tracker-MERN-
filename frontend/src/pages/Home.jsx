import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSucess } from "../utils";
import TransactionList from "./TransactionList";
import TransactionForm from "./TransactionForm";
import TransactionSummary from "./TransactionSummary";
// import profileIcon from "../assets/profileIcon.png";
import Chart from "../components/Chart";

function Home() {
  // const name = localStorage.getItem("loggedIn user");
  const [loggedInUser, setLoggedInUser] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [expenseAmt, setExpenseAmt] = useState(0);
  const [incomeAmt, setIncomeAmt] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  //const navigate = useNavigate();

  useEffect(() => {
    // Get the current date
    const today = new Date();
    const options = { weekday: "short", month: "short", day: "numeric" };
    const formattedDate = today
      .toLocaleDateString("en-US", options)
      .replace(",", "");
    setCurrentDate(formattedDate);
  }, []);

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

  // const handleLogOut = () => {
  //   localStorage.removeItem("loggedIn user");
  //   localStorage.removeItem("userId");

  //   handleSucess("Logged out successfully!");
  //   setTimeout(() => {
  //     navigate("/login");
  //   }, 1000);
  // };

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
    <section class=" mt-12 w-full grid grid-cols-1 md:grid-cols-[40%_60%] gap-10">
      <div class="flex gap-2 flex-col items-start">
        <div>
          <h1 class="text-4xl font-extrabold font-[Rubik]">DASHBOARD</h1>
          <p class="text-2xl mt-4 text-left">
            Hello, <span class="text-orange-500">{loggedInUser}</span>
          </p>
          <p class="text-2xl mt-1 text-left">Welcome!</p>
          <p class="mt-1 text-slate-500 text-left">{currentDate}</p>
        </div>

        <TransactionSummary incomeAmt={incomeAmt} expenseAmt={expenseAmt} />

        <Chart incomeAmt={incomeAmt} expenseAmt={expenseAmt} />
      </div>

      <div class="flex flex-col mx-10 px-4 gap-16">
        <TransactionList
          transactions={transactions}
          deleteTransaction={deleteTransaction}
        />
        <TransactionForm addTransaction={addTransaction} />
      </div>
    </section>
  );
}

export default Home;
