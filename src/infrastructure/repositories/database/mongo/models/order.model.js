const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true, trim: true },
  products: { type: String, required: true },
  total: { type: Number, required: true, min: 0 },
  status: { type: Boolean, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);