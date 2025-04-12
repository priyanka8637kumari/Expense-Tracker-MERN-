import express from 'express';
import { getTransactions, createTransaction, deleteTransaction, updateTransaction} from '../controllers/transactionController.js';
import { createValidation, updateValidation } from '../middleware/transactionValidation.js';

const router = express.Router();

router.get('/:userId', getTransactions); 
router.post('/', createValidation, createTransaction); 
router.delete('/', deleteTransaction); 
router.put('/', updateValidation, updateTransaction); 

export default router;