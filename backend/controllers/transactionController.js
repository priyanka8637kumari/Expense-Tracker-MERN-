import userModel from "../models/Users.js";
import transactionModel from "../models/Transactions.js";

//function to create a new transaction for a user
const createTransaction = async (req, res) => {
  try {
    const { userId, text, amount } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTransaction = new transactionModel({
      text,
      amount,
      user: userId,
    });

    const savedTransaction = await newTransaction.save();

    user.transactions.push(savedTransaction._id);
    await user.save();

    res.status(201).json({
      message: "Transaction created successfully",
      transaction: savedTransaction,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//function to get all transaction List for a user
const getTransactions = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findById(userId).populate("transactions");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User transactions retrieved successfully",
      transactions: user.transactions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//function to delete a transaction entry for a user
const deleteTransaction = async (req, res) => {
  try {
    const { userId, transactionId } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await transactionModel.findByIdAndDelete(transactionId);

    user.transactions = user.transactions.filter(
      (transaction) => transaction._id.toString() !== transactionId
    );
    await user.save();

    res.status(200).json({
      message: "Transaction deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createTransaction, getTransactions, deleteTransaction };
