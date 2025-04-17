import React from "react";
import { FiEdit, FiTrash2 } from 'react-icons/fi';

function TransactionList({ transactions, deleteTransaction, setEditTransaction }) {
  // Function to format the date
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
      transactions?.map((transaction) => (
        <div
          key={transaction._id}
          className="flex justify-between p-2 border-b-1 border-slate-700 gap-0.5"
        >
          <div className="flex gap-2">
          <button
            onClick={() => deleteTransaction(transaction._id)}
            className="text-red-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            title="Delete your entry"
            aria-label="Delete transaction"
          >
            <FiTrash2 />
          </button>
          <button
            onClick={() => setEditTransaction(transaction)}
            className="text-yellow-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            title="Edit your entry"
            aria-label="Edit transaction"
          >
            <FiEdit />
          </button>
          </div>
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
