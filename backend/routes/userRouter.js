import express from 'express';
import { signupValidation, loginValidation } from '../middleware/userValidation.js';
import { signup, login } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', loginValidation, login);

router.post('/signup', signupValidation, signup);

export default router;