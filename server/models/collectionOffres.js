//importation
const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    userId:{ type:mongoose.Schema.Types.ObjectId, required:true},
    image:{type:String},
    nom:{type:String},
    contenu:{type:String,required:true},
    commentaires:[
        {
            
            userId:{ type:mongoose.Schema.Types.ObjectId},
            nom:{type:String},
            image:{type:String},
            comments:{type:String},
            date:{type:Date, default:Date.now}
        }
    ]
    
},{timestamps:true})

module.exports =mongoose.model('Offres',Schema)