const mongoose = require('mongoose');

const purchaserSchema = new mongoose.Schema({
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
    default:'purchaser',
    require:true
  }
});

const Purchaser = mongoose.model('purchaser', purchaserSchema);

module.exports = Purchaser;
