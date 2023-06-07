//importation
const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    userId:{ type:mongoose.Schema.Types.ObjectId},
    photo:{ type:String },
    nom:{ type:String},
    prenom:{ type:String},
    email:{ type:String},
    numero:{ type:Number },
    proffession:{type:String},
    categorie:{type:String},
    address:{ type:String,required:true},
    longitude:{type:Number},
    latitude:{type:Number},
    biographie:{type:String},
    
},{timstamps:true})

module.exports =mongoose.model('Profile',Schema)