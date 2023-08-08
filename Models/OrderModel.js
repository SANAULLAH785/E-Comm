const mongoose = require('mongoose');

// Define the schema for the order object
const orderSchema = new mongoose.Schema({
  purchaserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Purchaser' // Assuming there is a 'User' model to reference the purchaser
  },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the 'Order' model based on the orderSchema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
