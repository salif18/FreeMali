const mongoose = require('mongoose')

// Modèle de données pour les messages
const Schema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, require:true},
    names:{type:String, require:true},
    email:{type:String, require:true},
    sujet:{type:String, require:true},
    messages:{type:String, require:true},
    reponses:[{
      userId:{type:mongoose.Schema.Types.ObjectId},
      reponse:{type:String},
      date:{type:Date, default:Date.now}
    }],
    adminlue:{type:String , default:'non lue'},
    userlue:{type:String , default:'non lue'}
  },{timestamps:true}); 

  module.exports = mongoose.model('MessageAdmin', Schema);
  