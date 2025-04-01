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
    <div className="container">
      <h1>Add your Transaction</h1>
      <form onSubmit={handleTransaction}>
        <div className="form-group">
          <label htmlFor="text">Category</label>
          <input
            onChange={handleChange}
            type="text"
            id="text"
            className="form-control"
            placeholder="Enter category"
            value={transactionData.text}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">amount</label>
          <input
            onChange={handleChange}
            type="amount"
            id="amount"
            className="form-control"
            placeholder="Enter amount"
            value={transactionData.amount}
          />
        </div>
        <button type="submit" className="btn btn-primary">
            Add Transaction
        </button>
       
      </form>
      {/* <ToastContainer /> */}
    </div>
  )
}

export default TransactionForm
