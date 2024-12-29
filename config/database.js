
const mongoose = require('mongoose');
require('dotenv').config(); // Ensure you load the .env file

// Construct the URI properly
const uri = `${process.env.DB_HOST}${process.env.DB_NAME}`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);  // Exit the application if connection fails
  }
};

module.exports = connectDB;