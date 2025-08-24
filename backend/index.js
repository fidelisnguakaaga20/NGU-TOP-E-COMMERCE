// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 5000;

// // body parsing
// app.use(express.json({ limit: '25mb' }));
// app.use(express.urlencoded({ extended: true }));

// // cookies & CORS
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
//   })
// );

// // routes
// const authRoutes = require('./src/users/user.route');
// const productsRoute = require('./src/products/products.route');
// const reviewRoutes = require('./src/reviews/reviews.router');

// app.use('/api/auth', authRoutes);
// app.use('/api/products', productsRoute);
// app.use('/api/reviews', reviewRoutes);

// // health checks (optional)
// app.get('/ping', (_req, res) => res.send('pong'));
// app.get('/', (_req, res) => res.send('Lebaba e-commerce server is running......'));


// // start server ONLY after DB connects
// (async () => {
//   try {
//     await mongoose.connect(process.env.DB_URL);
//     console.log('MongoDB connected');
//     app.listen(port, () => console.log(`Server on ${port}`));
//   } catch (err) {
//     console.error('Mongo connect failed:', err);
//     process.exit(1);
//   }
// })();


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// --- NEW: allow Render/Proxy to mark the request as HTTPS so secure cookies work
app.set('trust proxy', 1);

// body parsing
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true }));

// cookies
app.use(cookieParser());

// --- NEW: CORS (localhost + vercel prod + vercel previews)
const allowedOrigins = [
  'http://localhost:5173',
  'https://ngu-top-e-commerce.vercel.app', // your production frontend
  /\.vercel\.app$/                         // preview deployments on vercel
];

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true); // allow server-to-server/tools
      const ok = allowedOrigins.some((o) =>
        typeof o === 'string' ? o === origin : o.test(origin)
      );
      cb(ok ? null : new Error('Not allowed by CORS'), ok);
    },
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
