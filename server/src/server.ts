import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import db from './config/db';
import authRoutes from './routes/authRoutes';
import transactionRoutes from './routes/transactionRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/api/health', async (req, res) => {
    try {
        await db.query('SELECT 1 + 1 AS result');
        res.status(200).json({ message: 'Database connected successfully!', status: 'OK' });
    } catch (error) {
        res.status(500).json({ message: 'Database connection failed', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});