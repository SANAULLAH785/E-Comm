const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type: String,
    // enum:['admin','seller'],
    default:'seller',
    require:true
  }
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
