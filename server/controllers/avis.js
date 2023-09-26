//importation
const Profile = require('../models/collectionProfile')
 
//ajouter les avis sur client
exports.addAvis=(req,res,next)=>{
    const {id}=req.params
    const {avis} = req.body
    Profile
    .updateOne({userId:id},{$push:{avis:avis}},{new:true})
    .then((avi)=> res.status(201).json(avi))
    .catch((err)=> res.status(400).json({err}))
}

//supprimer les commemtaire au client
exports.deleteAvisCommit=(req,res,next)=>{

    const {userId,id}=req.params//recuperer userId de offres et id du commentaire
    
    Profile
    .updateOne(
        {userId:userId},//filter le commentaire selon userId
        {$pull:{avis:{_id:id}}},//supprimer le contenu du commentaire par son id
        {new:true})
    .then((avi)=> res.status(201).json(avi))
    .catch((err)=> res.status(400).json({err}))
    
    
    
}