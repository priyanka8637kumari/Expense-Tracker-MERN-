import React from 'react'

function TransactionSummary({incomeAmt, expenseAmt}) {
  return (
    <div class="border border-slate-700 mt-4 mx-auto flex flex-col rounded-lg p-5 shadow-md md:flex-row gap-8">
      <p class="text-2xl text-white">Income: {incomeAmt}</p>
      <p class="text-2xl text-orange-500">Expense: {expenseAmt}</p>
    </div>
  )
}

export default TransactionSummary
