import express from 'express';
import { configDotenv } from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from './routes/userRouter.js';
import transactionRouter from './routes/transactionRouter.js';


const app = express();

configDotenv();

const PORT = process.env.PORT || 5001;
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.use('/api/transactions', transactionRouter);


app.get('/ping', (req, res) => {
    res.send('pong');
    }
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });