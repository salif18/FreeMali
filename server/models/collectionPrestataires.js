const mongoose = require('mongoose')
const Schema = mongoose.Schema({
    nom:{type:String,required:true},
    prenom:{type:String,required:true},
    proffession:{type:String,required:true},
    categorie:{type:String,required:true},
    email:{type:String,required:true},
    numero:{type:Number,required:true},
    password:{type:String,required:true},
    isPrestataire:{ type:Boolean, default:true }
},{timestamps:true})

module.exports = mongoose.model('Prestataires',Schema)