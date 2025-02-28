const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  stock: { type: Number, default: 0 }
});

// Implémentation d'un index pour améliorer la recherche sur le nom
productSchema.index({ name: 'text' });

module.exports = mongoose.model("Product", productSchema);
