import { Router } from 'express';
import pool from '../db';

const router = Router();

router.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query error' });
  }
});

router.post('/products', async (req, res) => {
  const { name, retailer, price, url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (name, retailer, price, url) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, retailer, price, url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query error' });
  }
});

export default router;
