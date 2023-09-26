const Images = require('../models/images')
const fs = require('fs') 

exports.createImages = (req,res, next ) => {
    const imageObject = req.body
    const images = new Images({
        ...imageObject,
        photo:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    images.save()
    .then(()=>res.status(201).json({message:'Images crée'}))
    .catch((err)=>res.status(400).json({err}))
}

// pour par utilisateur connecter 
exports.getAllImages = (req,res,next)=>{
    Images
    .find().sort({createdAt:-1})
    .then((image)=> res.status(200).json(image))
    .catch((err)=> res.status(400).json({err}))
}

exports.getOneImage =(req,res,next) => {
  const {id} =req.params
  Images.findOne({_id:id})
  .then((img) => res.status(200).json(img))
   .catch((err) => res.status(400).json({err}))
}

// pour par utilisateur connecter 
exports.getImages = (req,res,next)=>{
    const {userId} = req.params
    console.log(userId)
    Images
    .find({userId:userId})
    .then((video)=> res.status(200).json(video))
    .catch((err)=> res.status(400).json({err}))
}




//supprimer le profil
exports.delImages = ( req, res, next) =>{
  const { id ,userId} = req.params
  Images.findOne({ _id: id})
  .then(image =>{ 
      if(image.userId !== userId){
        res.status(401).json({ message : "non autorisé"})
      }else{
        const filename = image.photo.split('/images/')[1]
        fs.unlink(`images/${filename}`,()=>{
          Images.deleteOne({ _id : id })
          .then(()=> res.status(200).json({ message : "image supprimé"}))
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
    Images
    .updateOne({_id:id},{$push:{commentaires:commentaires}},{new:true})
    .then((commentaire)=> res.status(201).json(commentaire))
    .catch((err)=> res.status(400).json({err}))
}

//supprimer les commemtaire au client
exports.deleteCommentaires=(req,res,next)=>{

    const {objectId,id}=req.params//recuperer userId de offres et id du commentaire
    console.log(objectId, id)
    Images
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
    
  
    Images.findOne({ _id: id })
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
  
        Images.updateOne({ _id: id }, updateData)
          .then(() => res.status(201).json({ msg: "Mise à jour réussie" }))
          .catch((err) => res.status(400).json({ err }));
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ err });
      });
  };
  