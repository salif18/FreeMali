const mongoose = require('mongoose')

// Modèle de données pour les messages
const Schema = new mongoose.Schema({
   conversationId:{type:String},
   sender:{type:String},
   receiver:{type:String},
   text:{type:String},
   status:{type:String, default:'non lue'}
  },{timestamps:true});

  module.exports = mongoose.model('Message', Schema);
  