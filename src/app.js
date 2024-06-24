const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const animalRoutes = require('./animal.routes');
const authRoutes = require('./auth.routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Aumentando o limite para 10mb (ajuste conforme necessário)
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Para permitir uploads grandes em formulários

// Connect to MongoDB Atlas
const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/animals', animalRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
