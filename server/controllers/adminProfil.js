//importation des modules
const fs = require('fs'); 
const AdminProfils = require('../models/adminProfilSchema'); 
  
//creation de nouveau profils
exports.createProfils = (req, res, next ) => {
    const profilObject = req.body
    delete profilObject._id,
    delete profilObject.userId
    const adminprofils = new AdminProfils({
        ...profilObject,
        userId:req.auth.userId,
        photo:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    adminprofils.save()
    .then(() => res.status(201).json({ message : "Profil creé"}))
    .catch((error) => res.status(400).json({error}))
};
 
//recuperer tous les profils
exports.getAllProfils = ( req, res ,next ) => {
    AdminProfils.find()
    .then((profil) => res.status(200).json(profil))
    .catch((error) => res.status(400).json({ error }))
};

//recuperer un seul profil et details
exports.getOneProfil = ( req, res, next ) => {
    const { id } = req.params
    AdminProfils.findOne({ _id : id })
    .then((profil) => res.status(200).json(profil))
    .catch((error) => res.status(401).json({ error }))
};

//recuperer le profil par costumer
exports.getProfilForAdmin = ( req, res, next ) => {
    const { userId } = req.params
    AdminProfils.findOne({ userId : userId })
    .then((profil) => res.status(200).json(profil))
    .catch((error) => res.status(401).json({ error }))
};
 

//modifier un produit
exports.modifyProfils = ( req, res, next ) => {
    const { userId } = req.params;

  const profileObject = req.file
    ? {
        ...req.body, 
        photo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      }
    : { ...req.body };

  AdminProfils.findOne({ userId: userId })
    .then((profil) => {
      if (profil.userId != req.auth.userId) {
        res.status(400).json({ message: 'Non autorisé' });
      } else {
        AdminProfils.findOneAndUpdate({ userId: userId }, { ...profileObject, userId: userId }, { new: true }) 
          .then((profile) => res.status(201).json(profile)) 
          .catch((err) => res.status(400).json({ err }));
      }
    })
    .catch((err) => res.status(400).json({ err }));
};

//modifier le champs photo

exports.modifyPhotoProfil = async (req, res, next) => {
  const { userId } = req.params;
  const newPhoto = req.file
    ? { photo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
    : null; 

  try {
    const updatedProfile = await AdminProfils.findOneAndUpdate(
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


//supprimer un le profil
exports.deleteProfils = ( req, res, next ) => {
    const { id } = req.params
    AdminProfils.deleteOne({ _id : id })
    .then(()=> res.status(200).json({ message:"Profil supprime"}))
    .catch((error) => res.status(400).json({error}))
    // Profils.findOne({ _id : id })
    // .then((profil) => {
    //     if(profil.userId !== req.auth.userId){
    //        return res.status(400).json({ message: "non autorise "})
    //     }else{
    //        const filename = profil.image.split('/images/')[1];
    //        fs.unlink(`images/${filename}`,()=>{
    //         Profils.deleteOne({ _id: id })
    //         .then(()=> res.status(200).json({ message: 'Profil supprime'}))
    //         .catch((error)=> res.status(400).json({ error }))
    //        })
    //     }
    // })
    // .catch((error)=> res.status(400).json({ error }))
}