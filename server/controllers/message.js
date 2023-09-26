const Message = require("../models/message");

//creer un nouveau message
exports.CreatMessage = (req, res) => {
  const message = new Message(req.body);
  message
    .save()
    .then((mess) => res.status(201).json(mess))
    .catch((err) => res.status(400).json({ err }));
}; 
 
//recuperer la conversation unique par conversationId
exports.getMessage = (req, res) => {
  const { conversationId } = req.params;
  Message.find({
    conversationId: conversationId,
  })
    .then((messag) => res.status(200).json(messag))
    .catch((err) => res.status(400).json({ err }));
};
  
//supprimer un message
exports.delMessage = (req, res) => {
  const { conversationId } = req.params;
  Message.deleteOne({
    conversationId: conversationId,
  })
    .then((messag) => res.status(200).json(messag))
    .catch((err) => res.status(400).json({ err }));
};

// changer le status du message lue
exports.changeStatus =(req,res,next)=>{
  const {id} = req.params
  const {newStatus} = req.body
  Message.findOneAndUpdate(
    {conversationId:id},
    {$set:{status:newStatus}},
    {new:true}
  )
  .then((messag)=>res.status(201).json({status:messag.status}))
  .catch((err)=>res.status(400).json({err}))
}

