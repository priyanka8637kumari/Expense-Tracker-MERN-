import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import transactionRouter from "./routes/transactionRouter.js";

const app = express();

configDotenv();

const PORT = process.env.PORT || 5001;
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Expense Tracker API');
});
app.use("/api/users", userRouter); // Route for user-related operations
app.use("/api/transactions", transactionRouter); // Route for transaction-related operations

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
