import React from "react";
//import homepageImage2 from "../assets/homepageImage2.png";

function TransactionList({ transactions, deleteTransaction }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options).replace(",", "");
  };
  return (
    // <div className="flex border-b-1 border-slate-700 py-4">
    <div className="px-8">
      <h2 className="text-3xl font-extrabold font-[Rubik mb-6">My Transactions</h2>
      {transactions?.map((transaction, index) => (
        <div
          key={index}
          className="flex justify-between p-2 border-b-1 border-slate-700 gap-0.5"
        >
          <button
            onClick={() => deleteTransaction(transaction._id)}
            className="text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            X
          </button>
          <div>{transaction.text}</div>
          <div>{transaction.amount}</div>
          <div>{formatDate(transaction.createdOn)}</div>
        </div>
      ))}
    </div>
   
  
  );
}

export default TransactionList;
