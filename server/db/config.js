const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
};

module.exports = connect;