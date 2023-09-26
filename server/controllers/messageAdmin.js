const MessageAdmin = require('../models/messageAdnim')

exports.creatMessages = (req,res,next)=>{
    const messageAdnim = new MessageAdmin({
        ...req.body 
    })
    
    messageAdnim.save()
    .then(()=>res.status(201).json({msg:'nouveau message'}))
    .catch((err)=>res.status(400).json(err))
}

// recuperations des discussion uniquement userId
exports.getMessages = (req,res,next)=>{
    MessageAdmin.find().sort({createdAt : -1})
    .then((conversation)=>res.status(200).json(conversation))
    .catch((err)=>res.status(400).json(err))
}

// recuperations des discussion uniquement userId
exports.getUniqueMessages = (req,res,next)=>{
    const {userId} = req.params
    MessageAdmin.find({userId:userId}).sort({createdAt:-1})
    .then((conversation)=>res.status(200).json(conversation))
    .catch((err)=>res.status(400).json(err))
}
 
// recuperations des dune convers uniquement
exports.getOneMessages = (req,res,next)=>{
    const {id} = req.params
    MessageAdmin.findOne({_id:id})
    .then((conversation)=>res.status(200).json(conversation))
    .catch((err)=>res.status(400).json(err))
}

//supprimer une conversation
exports.delMessages = (req,res,next)=>{
    const {id} = req.params
    MessageAdmin.deleteOne({_id:id})
    .then((conversation)=>res.status(200).json(conversation))
    .catch((err)=>res.status(400).json(err))
}

//supprimer une conversation
exports.delTousMessages = (req,res,next)=>{
    const {userId } = req.params
    MessageAdmin.deleteMany({userId:userId})
    .then((conversation)=>res.status(200).json(conversation))
    .catch((err)=>res.status(400).json(err))
}
// changer le status du message lue
exports.reponseMessage =(req,res,next)=>{
    const {id} = req.params;
    const {reponses} = req.body
    MessageAdmin.updateOne(
      { _id : id},
      {$push:{reponses:reponses}},
      {new:true}
    )
    .then((messag)=>res.status(201).json({messag}))
    .catch((err)=>res.status(400).json({err}))
  };

  //change amin lue
  exports.adminLueStatus = (req, res, next) =>{
    const { newStatus } = req.body;
    const { id } = req.params;
    MessageAdmin.findOneAndUpdate(
        { _id : id},
        {$set:{adminlue:newStatus}},
        {new : true}
    )
    .then((messag) => res.status(201).json({adminlue:messag.adminlue}))
    .catch((err)=> res.status(400).json({err}))
  }

  //change user lue
  exports.userLueStatus = (req, res, next) =>{
    const { id } = req.params;
    const { newStatus } = req.body;
    
    console.log(newStatus)
    console.log(id)
    MessageAdmin.findOneAndUpdate(
        { _id : id},
        {$set:{userlue:newStatus}},
        {new : true}
    )
    .then((messag) => res.status(201).json({messag}))
    .catch((err)=> res.status(400).json({err}))
  }
  

