import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import pool from '../db';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const result = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
            [username, email, passwordHash]
        );

        res.status(201).json(result.rows[0]);
    }   catch (error) {
        if ((error as any).code === '23505') {
            return res.status(400).json({ message: 'User already exists' });
        }   else {
            res.status(500).json({ message: 'Server error' });
        }
    }
});

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const user = result.rows[0];
        
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }
        
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'JWT secret is not defined' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: 'strict',
            maxAge: 3600000
        });

        res.json({ message: 'Login successful' });
    }   catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        return res.status(500).json({ message: 'JWT secret is not defined' });
    }

    jwt.verify(token, secret, (err: any, user: JwtPayload | string | undefined) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user;
        next();
    });
};

router.get('/protected', authenticate, (req: Request, res: Response) => {
    //res.json({ message: 'Protected route' });
    res.json({ authenticated: true });
});

router.post('/logout', (req: Request, res: Response) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
});

export default router;