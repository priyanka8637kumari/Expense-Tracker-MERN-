import express from 'express';
import { getTransactions, createTransaction, deleteTransaction} from '../controllers/transactionController.js';
import transactionValidation from '../middleware/transactionValidation.js';

const router = express.Router();

router.get('/:userId', getTransactions); // fetching all transactions
router.post('/', transactionValidation, createTransaction); // Creating a transaction and validating it
router.delete('/', deleteTransaction); // Deleting a transaction

export default router;