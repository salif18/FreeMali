const mongoose = require('mongoose')

const schema = mongoose.Schema({
    senderId:{type:String},
    receiverId:{type:String},
    type:{type:String},
    status:{type:String},
    description:{type:String},


},{timestamps:true})

module.exports = mongoose.model('Notifications', schema);