const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/games';

const connectDB = async () => {
  try {
    mongoose.connect(URI);
    console.log('Connected to MONGODB successfully!');
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;