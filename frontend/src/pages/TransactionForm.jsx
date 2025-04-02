import React, {useState} from 'react'
import { handleError } from '../utils';

function TransactionForm({addTransaction}) {
 
    const [transactionData, setTransactionData] = useState({ text: "", amount: "" });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setTransactionData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    }

    const handleTransaction = (e) => {
        e.preventDefault();
        console.log("transactionData", transactionData);
        const { text, amount } = transactionData;
        if(!text || !amount){
            handleError("All fields are required!");
            return;
        }
        setTimeout(() => {
            setTransactionData({ text: "", amount: "" });
        }, 1000);
        addTransaction(transactionData);
    };

  return (
    <div class="mx-auto p-6 bg-white rounded-lg">
      <p class="text-2xl font-bold mb-6">Add your Transaction</p>
      <form onSubmit={handleTransaction}>
        <div class="mb-4">
          <label htmlFor="text" class="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <input
            onChange={handleChange}
            type="text"
            id="text"
             class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter category"
            value={transactionData.text}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount" class="block text-sm font-medium text-gray-700 mb-2">amount</label>
          <input
            onChange={handleChange}
            type="amount"
            id="amount"
             class="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
            value={transactionData.amount}
          />
        </div>
        <button type="submit" class="bg-blue-500 mt-4 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Add Transaction
        </button>
       
      </form>
      {/* <ToastContainer /> */}
    </div>
  )
}

export default TransactionForm
