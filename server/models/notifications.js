const mongoose = require('mongoose')

const schema = mongoose.Schema({
    adminId:{type:String},
    senderId:{type:String},
    receiverId:{type:String},
    type:{type:String},
    offreId:{type:String},
    description:{type:String},
    status:{type:String, default:'non lue'}

},{timestamps:true})

module.exports = mongoose.model('Notifications', schema);