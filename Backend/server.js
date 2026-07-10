const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const User = require('./models/User');
dotenv.config();
connectDB();

const app = express();

// Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://ecom-mern-stack-trendzy.onrender.com',
  ],
  credentials: true
}));

const distPath = path.join(__dirname, "../Frontend/dist");

// API routes FIRST
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// THEN static files
app.use(express.static(distPath));

// ONLY for frontend routes (SAFE version)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.get("/test-user", async (req, res) => {
  try {
    const user = await User.findById("6a42a5cd92bba55d8661b2a0");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));