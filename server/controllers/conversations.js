const Conversations = require('../models/collectionConversation')

exports.creatConversations = (req,res,next)=>{
    const conversations = new Conversations({
        ...req.body 
    })
    console.log(conversations)
    conversations.save()
    .then(()=>res.status(201).json({msg:'nouveau message'}))
    .catch((err)=>res.status(400).json(err))
}

// recuperations des discussion uniquement userId
exports.getConversations = (req,res,next)=>{
    const {userId} = req.params
    Conversations.find({$or: [{userId:userId},{senderId:userId}]})
    .then((conversation)=>res.status(200).json(conversation))
    .catch((err)=>res.status(400).json(err))
}
 
// recuperations des dune convers uniquement
exports.getOneConversations = (req,res,next)=>{
    const {id} = req.params
    
    Conversations.findOne({_id:id})
    .then((conversation)=>res.status(200).json(conversation))
    .catch((err)=>res.status(400).json(err))
}

//supprimer une conversation
exports.delConversations = (req,res,next)=>{
    const {id} = req.params
    Conversations.deleteOne({_id:id})
    .then((conversation)=>res.status(200).json(conversation))
    .catch((err)=>res.status(400).json(err))
}

// mise a jours de la discussion dans la conversation
exports.updateConversations = (req,res,next)=>{
    const {id} = req.params
    const {discussions} = req.body
    console.log(discussions)
    Conversations.updateOne({_id:id},{$push:{discussions:discussions}},{new:true})
    .then((conversation)=>res.status(201).json(conversation))
    .catch((err)=>res.status(400).json(err))
}