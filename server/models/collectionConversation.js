const mongoose = require('mongoose')

// Modèle de données pour les messages
const Schema = new mongoose.Schema({
    userId:{type:String,required:true},
    senderId:{type:String,required:true},
    nom:{type:String},
    image:{type:String},
    discussions:[{
        userId:{type:String},
        image:{type:String},
        nom:{type:String},
        contenu:{type:String},
        date:{type:Date, default:Date.now}
    }]
  },{timestamps:true});

  module.exports = mongoose.model('Conversations', Schema);
  