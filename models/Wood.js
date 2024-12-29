const mongoose = require('mongoose');

const woodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  quantity: { type: Number, default: 0 },
});

module.exports = mongoose.model('Wood', woodSchema);