const mongoose = require('mongoose');
require ('dotenv').config();
const url=process.env.MongoUrl;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });
