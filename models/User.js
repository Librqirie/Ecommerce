// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    required: true,
    enum: [
      "Super Administrateur", 
      "Administrateur", 
      "Vendeur", 
      "Client", 
      "Gestionnaire de Commandes", 
      "Analyste Marketing"
    ]
  }
});

module.exports = mongoose.model('User', userSchema);