//importation
const Offres = require('../models/collectionOffres')

exports.CreatOffre = (req,res,next)=>{
    // const {userId,nom,prenom,email,numero,photo,address} = req.body
    const offres = new Offres({...req.body})
    offres.save()
    .then(()=>res.status(201).json({msg:'offre creer'}))
    .catch((err)=>res.status(400).json({err}))
}

// user recupere son offre
exports.getUserOffre = (req,res,next)=>{
    const {userId}=req.params
    Offres
    .find({userId:userId})
    .then((offre)=> res.status(200).json(offre))
    .catch((err)=> res.status(400).json({err}))
}


// application recupere tous offre
exports.getAllOffre = (req,res,next)=>{
    Offres
    .find()
    .then((offres)=> res.status(200).json(offres))
    .catch((err)=> res.status(400).json({err}))
}


//recuperer un seul offre parmi les autre
exports.getOneOffre = (req,res,next)=>{
    const {id}=req.params
    Offres
    .findOne({_id:id})
    .then((offre)=> res.status(200).json(offre))
    .catch((err)=> res.status(400).json({err}))

   
}

// ajouter des commentaires
exports.addCommentOffre = (req,res,next)=>{
    const {id}=req.params
    const {commentaires} = req.body
    Offres
    .updateOne({_id:id},{$push:{commentaires:commentaires}},{new:true})
    .then((offre)=> res.status(201).json(offre))
    .catch((err)=> res.status(400).json({err}))
}


// exports.getProfileToAdmin =async()=>{
//     try{
//        const profile = await Profile.aggregate([

//           {
//             $sort:{createdAt:-1}
//           },
//           {
//             $limit:5
//           }
//        ])
//        res.status(200).json(profile)
//     }catch(err){
//         res.status(500).json({err})
//     }
// }

exports.modifyOffre =(req,res,next)=>{
    Offres.updateOne({_id:req.params.id},{...req.body , _id:req.params.id})
    .then(()=>res.status(200).json({user:'modifier'}))
    .catch((err)=>res.status(400).json({err}))
}