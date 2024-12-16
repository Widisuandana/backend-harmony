const mongoose = require('mongoose');

const villaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true },
  location: { type: String, required: true },
  amenities: [String],
  images: [String],
}, { timestamps: true });

module.exports = mongoose.model('Villa', villaSchema);