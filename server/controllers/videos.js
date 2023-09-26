const Videos = require('../models/videos')
const fs = require('fs') 

exports.createVideos = (req,res, next ) => {
    const videoObject = req.body
    const videos = new Videos({
        ...videoObject,
        filePath:`${req.protocol}://${req.get('host')}/videos/${req.file.filename}`
    })
    videos.save()
    .then(()=>res.status(201).json({message:'video crée'}))
    .catch((err)=>res.status(400).json({err}))
}

// pour par utilisateur connecter 
exports.getAllVideos = (req,res,next)=>{
    Videos
    .find().sort({createdAt:-1})
    .then((video)=> res.status(200).json(video))
    .catch((err)=> res.status(400).json({err}))
}


exports.getOneVideo =(req,res,next) => {
  const {id} =req.params
  Videos.findOne({_id:id})
  .then((video) => res.status(200).json(video))
   .catch((err) => res.status(400).json({err}))
}
// pour par utilisateur connecter 
exports.getVideos = (req,res,next)=>{
    const {userId} = req.params
    
    Videos
    .find({userId:userId})
    .then((video)=> res.status(200).json(video))
    .catch((err)=> res.status(400).json({err}))
}




//supprimer le profil
exports.delVideos = ( req, res, next) =>{
  const { id ,userId} = req.params
  Videos.findOne({ _id: id})
  .then(video =>{ 
      if(video.userId !== userId){
        res.status(401).json({ message : "non autorisé"})
      }else{
        const filename = video.filePath.split('/videos/')[1]
        fs.unlink(`videos/${filename}`,()=>{
          Videos.deleteOne({ _id : id })
          .then(()=> res.status(200).json({ message : "video supprimé"}))
          .catch((err) => res.status(400).json({ err }))
        })
      }
  })
  .catch((err) => res.status(400).json({ err }))
}

//ajouter les avis sur client
exports.addCommentaires=(req,res,next)=>{
    const {id}=req.params
    const {commentaires} = req.body
    Videos
    .updateOne({_id:id},{$push:{commentaires:commentaires}},{new:true})
    .then((avi)=> res.status(201).json(avi))
    .catch((err)=> res.status(400).json({err}))
}

//supprimer les commemtaire au client
exports.deleteCommentaires=(req,res,next)=>{
    const {objectId,id}=req.params//recuperer userId de offres et id du commentaire
    console.log(objectId, id)
    Videos
    .updateOne(
        {_id:objectId},//filter le commentaire selon userId
        {$pull:{commentaires:{_id:id}}},//supprimer le contenu du commentaire par son id
        {new:true})
    .then((avi)=> res.status(201).json(avi))
    .catch((err)=> res.status(400).json({err}))
}


//notation videos
exports.usersNotations = (req, res, next) => {
    const { userId, likes } = req.body;
    const { id } = req.params;
    
  
    Videos.findOne({ _id: id })
      .then((like) => {
        if (!like) {
          return res.status(404).json({ msg: "Profil non trouvé" });
        }
  
        let updateData = {};
  
        if (!like.usersLikes.includes(userId) && likes === 1) {
          updateData = {
            $inc: { likes: +1 },
            $push: { usersLikes: userId },
          };
        } else if (like.usersLikes.includes(userId) && likes === 0) {
          updateData = {
            $inc: { likes: -1 },
            $pull: { usersLikes: userId },
          };
        }
  
        if (!like.usersDisLikes.includes(userId) && likes === -1) {
          updateData = {
            $inc: { disLikes: +1 },
            $push: { usersDisLikes: userId },
          };
        } else if (like.usersDisLikes.includes(userId) && likes === 0) {
          updateData = {
            $inc: { disLikes: -1 },
            $pull: { usersDisLikes: userId },
          };
        }
  
        if (Object.keys(updateData).length === 0) {
          return res.status(200).json({ msg: "Aucun changement" });
        }
  
        Videos.updateOne({ _id: id }, updateData)
          .then(() => res.status(201).json({ msg: "Mise à jour réussie" }))
          .catch((err) => res.status(400).json({ err }));
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ err });
      });
  };
  