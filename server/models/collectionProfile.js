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
    latitude:{type:Number},
    longitude:{type:Number},
    biographie:{type:String},
    usersLikes:{type:[String]},
    usersDisLikes:{type:[String]}, 
    likes:{type:Number, default:0},
    disLikes:{type:Number, default:0},
    avis:[{
        userId:{ type:mongoose.Schema.Types.ObjectId},
        comments:{type:String},
        date:{type:Date, default:Date.now}
    }]
    
},{timstamps:true})

module.exports =mongoose.model('Profile',Schema)