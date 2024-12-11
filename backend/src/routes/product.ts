import express, { Request, Response } from 'express';
import pool from '../db';

const router = express.Router();

// get products
router.get('/', async (req: Request, res: Response) => {
  const products = await pool.query('SELECT * FROM products');
  res.json(products.rows);
});

// get product by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Fetch product information
    const productResult = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (productResult.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = productResult.rows[0];

    // Fetch prices from the `prices` table
    const pricesResult = await pool.query(
      'SELECT retailer_name, price, retailer_url FROM prices WHERE product_id = $1',
      [id]
    );

    const prices = pricesResult.rows; // Array of prices with retailer_name, price, and retailer_url

    res.json({ product, prices });
  } catch (error) {
    console.error('Error fetching product data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;