//importation
const Profile = require('../models/collectionProfile')
const fs = require('fs')

exports.CreatProfile = (req,res,next)=>{
    const profileObject = req.body
    const profile = new Profile({
        ...profileObject,
        photo:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    profile.save()
    .then(()=>res.status(201).json({msg:'profile crée'}))
    .catch((err)=>res.status(400).json({err}))
}
 
// pour par utilisateur connecter 
exports.getProfile = (req,res,next)=>{
    const {userId}=req.params
    Profile
    .find({userId:userId})
    .then((user)=> res.status(200).json(user))
    .catch((err)=> res.status(400).json({err}))

   
}

//le profile d'un prestaire
exports.getOneprestaProfile = (req,res,next)=>{
    const {id} = req.params
    Profile
    .findOne({userId:id})
    .then((profile)=> res.status(200).json(profile))
    .catch((err)=> res.status(400).json({err}))

   
}

// obtenir tous les profile
exports.getProfileAll = (req,res,next)=>{
    Profile
    .find()
    .then((profile)=> res.status(200).json(profile))
    .catch((err)=> res.status(400).json({err}))
}

// modifier le profile
exports.modifyProfile = (req, res, next) => {
  const { userId } = req.params;

  const profileObject = req.file
    ? {
        ...req.body, 
        photo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      }
    : { ...req.body };

  Profile.findOne({ userId: userId })
    .then((profil) => {
      if (profil.userId != req.auth.userId) {
        res.status(400).json({ message: 'Non autorisé' });
      } else {
        Profile.findOneAndUpdate({ userId: userId }, { ...profileObject, userId: userId }, { new: true }) 
          .then((profile) => res.status(201).json(profile)) 
          .catch((err) => res.status(400).json({ err }));
      }
    })
    .catch((err) => res.status(400).json({ err }));
   
};

// modifier chacun des champs du profile
exports.modifyProfilePhoto = async(req,res,next)=>{
    const { userId } = req.params;
    const newPhoto = req.file
      ? { photo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
      : null; 
  
    try {
      const updatedProfile = await Profile.findOneAndUpdate(
        { userId: userId },
        { $set: newPhoto },
        { new: true }
      );
  
      if (!updatedProfile) {
        return res.status(404).json({ message: 'Profil non trouvé' });
      }
  
      res.status(200).json({ photo: updatedProfile.photo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour de la photo du profil' });
    }
  };
  


//supprimer le profil
exports.deleteProfile = ( req, res, next) =>{
    const { userId } = req.params
    Profile.findOne({ userId : userId})
    .then(profil =>{ 
        if(profil.userId !== userId){
          res.status(401).json({ message : "non autorisé"})
        }else{
          const filename = profil.photo.split('/images/')[1]
          fs.unlink(`images/${filename}`,()=>{
            Profile.deleteOne({ userId : userId })
            .then(()=> res.status(200).json({ message : "profil supprimé"}))
            .catch((err) => res.status(400).json({ err }))
          })
        }
    })
    .catch((err) => res.status(400).json({ err }))
}
