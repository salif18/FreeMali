const mongoose = require('mongoose')

// Modèle de données pour les messages
const Schema = new mongoose.Schema({
   userId:{type:mongoose.Schema.Types.ObjectId},
   contenue:{type:String, require:true}
  },{timestamps:true}); 

  module.exports = mongoose.model('Recomandations', Schema);