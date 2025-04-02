import React from 'react'

function TransactionList({transactions, deleteTransaction}) {
    // console.log("transactions", transactions);
  return (
    <div class="bg-white rounded-lg p-4 shadow-md">
      <h2 class="text-2xl font-bold mb-6">Recent History</h2>
     {transactions?.map((transaction, index) => (
        <div key={index} class="flex justify-between p-2 border-b-1">
            <button onClick={() => deleteTransaction(transaction._id)} class="bg-red-300 p-1">X</button>
         <div>{transaction.text}</div>
         <div>{transaction.amount}</div>
         {/* <div>{transaction.createdOn}</div> */}
        </div>
      ))}
    </div>
  )
}

export default TransactionList
