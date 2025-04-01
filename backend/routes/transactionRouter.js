import express from 'express';
import { getTransactions, createTransaction, deleteTransaction} from '../controllers/transactionController.js';

const router = express.Router();

router.get('/:userId', getTransactions); // fetching all transactions
router.post('/', createTransaction); // Create a transaction
router.delete('/', deleteTransaction); // Delete a transaction

export default router;