import React from 'react'

function TransactionSummary({incomeAmt, expenseAmt}) {
  return (
    <div class="flex justify-between g-4 bg-white rounded-lg p-5 text-center shadow-md">
      <p class="text-green-500 text-2xl text-bold">Income: {incomeAmt}</p>
      <p class="text-red-500 text-2xl text-bold">Expense: {expenseAmt}</p>
    </div>
  )
}

export default TransactionSummary
