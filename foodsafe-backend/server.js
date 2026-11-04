const crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const mongoUri = process.env.MONGO_URI || 'mongodb://host.docker.internal:27017/foodsafe';

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch(err => console.error('Database connection error:', err));

const merchantRoutes = require('./routes/merchantRoutes');
app.use('/api/merchants', merchantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});