import express from 'express';
import { signupValidation, loginValidation } from '../middleware/userValidation.js';
import { signup, login } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', loginValidation, login); // Route for user login and validation

router.post('/signup', signupValidation, signup); // Route for user signup and validation

export default router;