import React, { useState } from "react";
import { handleError } from "../utils";
import homepageImage from "../assets/homepageImage.png";

function TransactionForm({ addTransaction }) {
  const [transactionData, setTransactionData] = useState({
    text: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTransactionData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleTransaction = (e) => {
    e.preventDefault();
    console.log("transactionData", transactionData);
    const { text, amount } = transactionData;
    if (!text || !amount) {
      handleError("All fields are required!");
      return;
    }
    setTimeout(() => {
      setTransactionData({ text: "", amount: "" });
    }, 1000);
    addTransaction(transactionData);
  };

  return (
    <div class="flex">
      <div class="mx-auto -mt-8 p-6 rounded-lg basis-3/5">
        <p class="text-3xl font-extrabold font-[Rubik mb-6">
          Add your Transaction
        </p>
        <form onSubmit={handleTransaction}>
          <div class="mb-4">
            <input
              onChange={handleChange}
              type="text"
              id="text"
              class="w-full p-3 mb-2 border text-white text-lg border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter category"
              value={transactionData.text}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange}
              type="amount"
              id="amount"
              class="w-full p-3 mb-2 border text-white text-lg border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter amount"
              value={transactionData.amount}
            />
          </div>
          <button
            type="submit"
            class="bg-orange-500 py-2 px-10 mt-6 rounded-lg hover:bg-slate-900 hover:border hover:border-orange-500"
          >
            Add Transaction
          </button>
        </form>
        {/* <ToastContainer /> */}
      </div>
      <div class="basis-2/5">
        <img src={homepageImage} alt="pointing to add transaction" class="animate-bounce"/>
      </div>
    </div>
  );
}

export default TransactionForm;
