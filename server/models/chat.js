const mongoose = require('mongoose')

// Modèle de données pour les messages
const Schema = new mongoose.Schema({
    membres:{type:Array}
    
  },{timestamps:true});

  module.exports = mongoose.model('Chat', Schema);
  