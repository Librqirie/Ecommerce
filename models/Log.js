const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  action: { 
    type: String, 
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  date: { 
    type: Date 
  }
});

module.exports = mongoose.model('Log', logSchema);