import React from 'react'

function TransactionSummary({incomeAmt, expenseAmt}) {
  return (
    <div>
      <h1>Income: {incomeAmt}</h1>
      <h1>Expense: {expenseAmt}</h1>
    </div>
  )
}

export default TransactionSummary
