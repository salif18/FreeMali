//importation
const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    userId:{ type:mongoose.Schema.Types.ObjectId, required:true},
    contenu:{type:String,required:true},
    category:{type:String, required:true},
    budget:{type:Number},
    sujet:{type:String, required:true},
    prise:{type:Boolean, default:false},
    commentaires:[
        {
            
            userId:{ type:mongoose.Schema.Types.ObjectId},
            comments:{type:String},
            budgetOffre:{type:Number},
            accept:{type:Boolean, default:false},
            date:{type:Date, default:Date.now} 
        }
    ]
    
},{timestamps:true})

module.exports =mongoose.model('Offres',Schema)