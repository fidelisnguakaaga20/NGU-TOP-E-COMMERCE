const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// body parsing
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true }));

// cookies & CORS
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// routes
const authRoutes = require('./src/users/user.route');
const productsRoute = require('./src/products/products.route');
const reviewRoutes = require('./src/reviews/reviews.router');

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoute);
app.use('/api/reviews', reviewRoutes);

// health checks (optional)
app.get('/ping', (_req, res) => res.send('pong'));
app.get('/', (_req, res) => res.send('Lebaba e-commerce server is running......'));

// start server ONLY after DB connects
(async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('MongoDB connected');
    app.listen(port, () => console.log(`Server on ${port}`));
  } catch (err) {
    console.error('Mongo connect failed:', err);
    process.exit(1);
  }
})();