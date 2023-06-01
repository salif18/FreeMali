//importation
const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    userId:{ type:String},
    photo:{ type:String },
    nom:{ type:String},
    prenom:{ type:String},
    email:{ type:String},
    numero:{ type:Number },
    proffession:{type:String},
    categorie:{type:String},
    address:{ type:String,required:true},
    biographie:{type:String},
    isPrestataire:{ type:Boolean, default:false }
},{timstamps:true})

module.exports =mongoose.model('Profile',Schema)