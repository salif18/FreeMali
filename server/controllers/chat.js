const Chat = require('../models/chat')


//new chat membre de chat contacts
exports.CreatChat=(req,res)=>{
 const chat = new Chat({
    membres:[req.body.senderId,req.body.receiverId]
 })
 chat.save()
 .then((cha)=>res.status(201).json(cha))
 .catch(err => res.status(400).json({err}))
}

// recuperer le contact des chatters user par son userId
exports.getChat=(req,res)=>{
  Chat.find({
     membres:{$in:[req.params.userId]}
  }).sort({createdAt:-1})
  .then((chat)=>res.status(200).json(chat))
  .catch((err)=>res.status(400).json({err}))
}