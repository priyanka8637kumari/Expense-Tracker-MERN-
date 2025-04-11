import React from "react";

function TransactionList({ transactions, deleteTransaction }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options).replace(",", "");
  };
  return (
    <div className="px-8">
      <h2 className="text-3xl font-extrabold font-[Rubik mb-6">
        My Transactions
      </h2>
      {transactions && transactions.length > 0 ? (
      transactions?.map((transaction, index) => (
        <div
          key={index}
          className="flex justify-between p-2 border-b-1 border-slate-700 gap-0.5"
        >
          <button
            onClick={() => deleteTransaction(transaction._id)}
            className="text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            title="Delete your entry"
          >
            X
          </button>
          <div>{transaction.text}</div>
          <div className={`${transaction.amount < 0 ? "text-orange-500" : "text-white"}`}>{transaction.amount}</div>
          <div>{formatDate(transaction.createdOn)}</div>
        </div>
      ))
      ) : (
        <div className="text-center text-gray-500">
          No transactions available.
        </div>
      )}
    </div>
  );
}

export default TransactionList;
