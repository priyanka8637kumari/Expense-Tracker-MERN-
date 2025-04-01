import React from 'react'

function TransactionList({transactions, deleteTransaction}) {
    // console.log("transactions", transactions);
  return (
    <div>
     {transactions?.map((transaction, index) => (
        <div key={index}>
            <button onClick={() => deleteTransaction(transaction._id)}>X</button>
         <div>{transaction.text}</div>
         <div>{transaction.amount}</div>
         {/* <div>{transaction.createdOn}</div> */}
        </div>
      ))}
    </div>
  )
}

export default TransactionList
