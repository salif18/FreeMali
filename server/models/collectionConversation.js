const mongoose = require('mongoose')

// Modèle de données pour les messages
const Schema = new mongoose.Schema({
    userId:{ type:mongoose.Schema.Types.ObjectId, required:true},
    senderId:{type:mongoose.Schema.Types.ObjectId,required:true},
    nom:{type:String},
    nomSender:{type:String},
    image:{type:String},
    imageSender:{type:String},
    discussions:[{
        userId:{type:mongoose.Schema.Types.ObjectId},
        image:{type:String},
        nom:{type:String},
        contenu:{type:String},
        date:{type:Date, default:Date.now}
    }]
  },{timestamps:true});

  module.exports = mongoose.model('Conversations', Schema);
  