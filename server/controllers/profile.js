//importation
const Profile = require('../models/collectionProfile')

exports.CreatProfile = (req,res,next)=>{
    // const {userId,nom,prenom,email,numero,photo,address} = req.body
    const profile = new Profile({...req.body})
    profile.save()
    .then(()=>res.status(201).json({msg:'profile creer'}))
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
    console.log(id)
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


exports.getProfileOfuser =async()=>{
    try{
       const profile = await Profile.aggregate([
       
//           {
//             $lookup:{
//                 from:'users',
//                 localField:'userId',
//                 foreignField:'_id',
//                 as:'user'
//             }
//           },
         
       ])
       res.status(200).json(profile)
    }catch(err){
        res.status(500).json({err})
    }
}

// modifier le profile
exports.modifyProfile =(req,res,next)=>{
    Profile.updateOne({userId:req.params.userId},{...req.body , userId:req.params.userId})
    .then(()=>res.status(200).json({user:'modifier'}))
    .catch((err)=>res.status(400).json({err}))
}
