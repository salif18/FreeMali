const Message = require('../models/message')

//creer un nouveau message
exports.CreatMessage=(req,res)=>{
  const message = new Message(req.body)
  message.save()
  .then((mess)=>res.status(201).json(mess))
  .catch((err)=>res.status(400).json({err}))
}

//recuperer la conversation unique par conversationId
exports.getMessage=(req,res)=>{
    const {conversationId} = req.params
    console.log(conversationId)
  Message.find({
    conversationId:conversationId
  })
  .then((messag)=>res.status(200).json(messag))
  .catch((err)=>res.status(400).json({err}))
}