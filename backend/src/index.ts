import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));
app.use(express.json());

app.use('/api', productRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
