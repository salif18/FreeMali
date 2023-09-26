const mongoose = require('mongoose')

const schema = mongoose.Schema({
    userId:{type:String},
    filePath:{type:String},
    type:{type:String , default:'video'},
    description:{type:String},
    usersLikes:{type:[String]},
    usersDisLikes:{type:[String]}, 
    likes:{type:Number, default:0},
    disLikes:{type:Number, default:0},
    commentaires:[{
        userId:{ type:mongoose.Schema.Types.ObjectId},
        text:{type:String},
        date:{type:Date, default:Date.now}
    }]
},{timestamps:true})

module.exports = mongoose.model('Videos',schema)