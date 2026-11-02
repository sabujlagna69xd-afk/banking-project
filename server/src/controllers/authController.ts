import { Request, Response } from 'express';
import pool from '../config/db';

// Login Controller with Safe Fallback and Debug Logging
export const login = async (req: Request, res: Response): Promise<any> => {
  const { username, password, role } = req.body;

  try {
    console.log(`[LOGIN ATTEMPT] Username: ${username}, Role: ${role}`);

    // 1. Check user by username only first (Case Insensitive)
    const [rows]: any = await pool.query(
      'SELECT * FROM users WHERE LOWER(username) = LOWER(?)',
      [username?.trim()]
    );

    // If user does not exist in DB
    if (!rows || rows.length === 0) {
      console.log(`[LOGIN FAILED] User '${username}' not found in database.`);
      return res.status(401).json({ message: 'User not found! Please check username or register.' });
    }

    const user = rows[0];

    // 2. Validate Password (Direct String Compare)
    if (String(user.password).trim() !== String(password).trim()) {
      console.log(`[LOGIN FAILED] Password mismatch for user '${username}'.`);
      return res.status(401).json({ message: 'Incorrect password! Please try again.' });
    }

    // 3. Optional Role Check (Matches if DB has role column, else allows)
    if (role && user.role && user.role.toLowerCase() !== role.toLowerCase()) {
      console.log(`[LOGIN FAILED] Role mismatch. Expected: ${role}, DB Role: ${user.role}`);
      return res.status(403).json({ message: `Access denied. Account is registered as ${user.role}.` });
    }

    console.log(`[LOGIN SUCCESS] User '${username}' logged in successfully.`);

    // Return User Data (matching frontend expectations)
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        account_number: user.account_number || 'A1234567890',
        balance: Number(user.balance) || 0.00,
        role: user.role || role || 'customer'
      }
    });

  } catch (error: any) {
    console.error('[DATABASE LOGIN ERROR]:', error.message);
    return res.status(500).json({ message: 'Database error: ' + error.message });
  }
};

// Reset Password Controller
export const resetPassword = async (req: Request, res: Response): Promise<any> => {
  const { username, newPassword } = req.body;

  if (!username || !newPassword) {
    return res.status(400).json({ message: 'Username and new password are required.' });
  }

  try {
    const [rows]: any = await pool.query(
      'SELECT * FROM users WHERE LOWER(username) = LOWER(?)',
      [username?.trim()]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: 'User not found with this username.' });
    }

    await pool.query(
      'UPDATE users SET password = ? WHERE LOWER(username) = LOWER(?)',
      [newPassword.trim(), username.trim()]
    );

    console.log(`[PASSWORD RESET] Password updated for user '${username}'.`);
    return res.status(200).json({ message: 'Password updated successfully in database!' });
  } catch (error: any) {
    console.error('[RESET PASSWORD ERROR]:', error.message);
    return res.status(500).json({ message: 'Internal server error while updating password.' });
  }
};