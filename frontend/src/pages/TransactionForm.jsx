import React, { useState, useEffect } from "react";
import { handleError } from "../utils";
import homepageImage from "../assets/homepageImage.png";
import { trackEvent } from "../analytics";

function TransactionForm({ transaction, handleSubmit }) {
  const [transactionData, setTransactionData] = useState({
    text: "",
    amount: "",
  });

  useEffect(() => {
    if (transaction) {
      setTransactionData({
        text: transaction.text || "",
        amount: transaction.amount || "",
      });
    } else {
      setTransactionData({
        text: "",
        amount: "",
      });
    }
  }, [transaction]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTransactionData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleTransaction = (e) => {
    e.preventDefault();
    const { text, amount } = transactionData;
    if (!text || !amount) {
      handleError("All fields are required!");
      return;
    }

    // Check if amount is a number
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) {
      handleError("Amount must be a number!");
      return;
    }

    //Tracking form submission
    trackEvent(
      "Form",
      "Submit",
      transaction ? "Update Transaction" : "Add Transaction"
    );

    handleSubmit({ ...transactionData, amount: amountNum });

    // Reseting the form after submission
    if (!transaction) {
      setTimeout(() => {
        setTransactionData({ text: "", amount: "" });
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="mx-auto -mt-8 p-6 rounded-lg basis-4/6">
        <p className="text-3xl font-extrabold font-[Rubik mb-6">
          {transaction ? "Update your Transaction" : "Add your Transaction"}
        </p>
        <form onSubmit={handleTransaction}>
          <div className="mb-4">
            <label htmlFor="transaction-category" className="sr-only">
              Transaction Category
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="text"
              className="w-full p-3 mb-2 border text-white text-lg border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your transaction category"
              value={transactionData.text}
            />
          </div>
          <div>
            <label htmlFor="amount" className="sr-only">
              Amount
            </label>
            <input
              onChange={handleChange}
              type="amount"
              id="amount"
              className="w-full p-3 mb-2 border text-white text-lg border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter Amount(+ve for income, -ve for expense)"
              value={transactionData.amount}
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 py-2 px-10 mt-6 rounded-lg hover:bg-slate-900 hover:border hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {transaction ? "Update Transaction" : "Add Transaction"}
          </button>
        </form>
      </div>
      <div className="basis-2/6">
        <img
          src={homepageImage}
          alt="pointing to add transaction"
          className="animate-bounce md:mt-10 mx-auto"
        />
      </div>
    </div>
  );
}

export default TransactionForm;
