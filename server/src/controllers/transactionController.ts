import { Request, Response } from 'express';
import db from '../config/db';

// ১. ডিপোজিট এপিআই (টাকা জমা করা)
export const deposit = async (req: Request, res: Response) => {
    const { account_number, amount } = req.body;

    if (!account_number || !amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid account number or amount' });
    }

    try {
        const [rows]: any = await db.query('SELECT * FROM users WHERE account_number = ?', [account_number]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Account not found' });
        }

        const newBalance = Number(rows[0].balance) + Number(amount);
        await db.query('UPDATE users SET balance = ? WHERE account_number = ?', [newBalance, account_number]);

        res.status(200).json({ message: 'Deposit successful', balance: newBalance });
    } catch (error) {
        res.status(500).json({ message: 'Deposit failed', error });
    }
};

// ২. মানি ট্রান্সফার এপিআই (টাকা পাঠানো)
export const transfer = async (req: Request, res: Response) => {
    const { sender_account, receiver_account, amount } = req.body;

    if (!sender_account || !receiver_account || !amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid transfer details' });
    }

    try {
        const [senderRows]: any = await db.query('SELECT * FROM users WHERE account_number = ?', [sender_account]);
        const [receiverRows]: any = await db.query('SELECT * FROM users WHERE account_number = ?', [receiver_account]);

        if (senderRows.length === 0 || receiverRows.length === 0) {
            return res.status(404).json({ message: 'Sender or receiver account not found' });
        }

        const sender = senderRows[0];
        if (Number(sender.balance) < Number(amount)) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        const newSenderBalance = Number(sender.balance) - Number(amount);
        const newReceiverBalance = Number(receiverRows[0].balance) + Number(amount);

        // ব্যালেন্স আপডেট
        await db.query('UPDATE users SET balance = ? WHERE account_number = ?', [newSenderBalance, sender_account]);
        await db.query('UPDATE users SET balance = ? WHERE account_number = ?', [newReceiverBalance, receiver_account]);

        res.status(200).json({ 
            message: 'Transfer successful', 
            sender_account, 
            remaining_balance: newSenderBalance 
        });
    } catch (error) {
        res.status(500).json({ message: 'Transfer failed', error });
    }
};