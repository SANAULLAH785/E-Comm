const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Purchaser',
    required: true,
  },
  items: [
    {
      productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Assuming you have a 'Product' model to reference products
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
