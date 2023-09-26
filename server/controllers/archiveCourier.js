const ArchivesCouriers = require('../models/archiveCourierSchema')

exports.creatMessages = (req,res, next)=>{
    const archivesCouriers = new ArchivesCouriers({
        ...req.body 
    }) 
    
    archivesCouriers.save()
    .then(()=>res.status(201).json({msg:'nouveau message'}))
    .catch((err)=>res.status(400).json(err))
}

// recuperations des discussion uniquement userId
exports.getMessages = (req,res,next)=>{ 
    ArchivesCouriers.find().sort({createdAt : -1})
    .then((conversation)=>res.status(200).json(conversation))
    .catch((err)=>res.status(400).json(err))
}

// recuperations des discussion uniquement userId
exports.getUniqueMessages = (req,res,next)=>{
    const {userId} = req.params
    ArchivesCouriers.find({userId:userId})
    .then((conversation)=>res.status(200).json(conversation))
    .catch((err)=>res.status(400).json(err))
}
 
// recuperations des dune convers uniquement
exports.getOneMessages = (req,res,next)=>{
    const {id} = req.params
    ArchivesCouriers.findOne({_id:id})
    .then((conversation)=>res.status(200).json(conversation))
    .catch((err)=>res.status(400).json(err))
}

//supprimer une conversation
exports.delMessages = (req,res,next)=>{
    const {id} = req.params
    ArchivesCouriers.deleteOne({_id:id})
    .then((conversation)=>res.status(200).json(conversation))
    .catch((err)=>res.status(400).json(err))
}
//supprimer une conversation
exports.delTousMessages = (req,res,next)=>{
    ArchivesCouriers.deleteMany({})
    .then((conversation)=>res.status(200).json(conversation))
    .catch((err)=>res.status(400).json(err))
}

// changer le status du message lue
exports.reponseMessage =(req,res,next)=>{
    const {id} = req.params;
    const {reponses} = req.body
    ArchivesCouriers.updateOne(
      { _id : id},
      {$push:{reponses:reponses}},
      {new:true}
    )
    .then((messag)=>res.status(201).json({messag}))
    .catch((err)=>res.status(400).json({err}))
  };

  //change amin lue
  exports.adminLue = (req, res, next) =>{
    const { lue } = req.body;
    const { id } = req.params;
    ArchivesCouriers.findOneAndUpdate(
        { _id : id},
        {$set:{adminlue:lue}},
        {new : true}
    )
    .then((messag) => res.status(201).json({adminlue:messag.adminlue}))
    .catch((err)=> res.status(400).json({err}))
  }

  //change user lue
  exports.userLue = (req, res, next) =>{
    const { lue } = req.body;
    const { id } = req.params;
    ArchivesCouriers.findOneAndUpdate(
        { _id : id},
        {$set:{userlue:lue}},
        {new : true}
    )
    .then((messag) => res.status(201).json({userlue:messag.userlue}))
    .catch((err)=> res.status(400).json({err}))
  }
  

