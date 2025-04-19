const express = require('express');
const app = express();
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
const authRoutes = require('./src/routes/auth.routes');
app.use('/api/v1/auth', authRoutes);

app.listen(port, () => {
  console.log(`Fitverse Server listening on port ${port}`);
});
