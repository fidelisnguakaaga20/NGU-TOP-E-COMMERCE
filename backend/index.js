const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Allow proxy headers (for cookies on Render)
app.set('trust proxy', 1);

// Body parsing
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// ✅ FIXED: allow localhost and your Vercel domain only
const allowedOrigins = [
  'http://localhost:5173',
  'https://ngu-top-e-commerce.vercel.app'
];

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true); // allow Postman/curl
      const ok = allowedOrigins.includes(origin);
      cb(ok ? null : new Error('Not allowed by CORS'), ok);
    },
    credentials: true,
  })
);

// Routes
const authRoutes = require('./src/users/user.route');
const productsRoute = require('./src/products/products.route');
const reviewRoutes = require('./src/reviews/reviews.router');

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoute);
app.use('/api/reviews', reviewRoutes);

// Health checks
app.get('/ping', (_req, res) => res.send('pong'));
app.get('/', (_req, res) => res.send('NGU-TOP e-commerce server is running...'));

// Start server after DB connects
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
