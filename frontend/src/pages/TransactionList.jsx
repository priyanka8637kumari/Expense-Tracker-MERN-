import React from 'react'

function TransactionList({transactions, deleteTransaction}) {
    // console.log("transactions", transactions);
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { month: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-US', options).replace(',', '');
    };
  return (
    <div class="rounded-lg px-20 shadow-md">
      <h2 class="text-3xl font-extrabold font-[Rubik mb-6">My Transactions</h2>
     {transactions?.map((transaction, index) => (
        <div key={index} class="flex justify-between p-2 border-b-1 border-slate-700 gap-0.5">
            <button onClick={() => deleteTransaction(transaction._id)} class="text-orange-500">X</button>
         <div>{transaction.text}</div>
         <div>{transaction.amount}</div>
         <div>{formatDate(transaction.createdOn)}</div> 
        </div>
      ))
      }
    </div>
  )
}

export default TransactionList
