//importation
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const Users = require('../models/collectionUsers')
const Profile =require('../models/collectionProfile')
const dotenv = require('dotenv')

//configuration
dotenv.config()

//registre user
exports.signup = (req,res,next)=>{
    bcrypt.hash(req.body.password , 10)
    .then(hash=>{
        const users = new Users({
            // nom:req.body.nom,
            // prenom:req.body.prenom,
            // numero:req.body.numero,
            ...req.body,
            password:hash
        })
        users.save()
        .then((user)=>
        res.status(200).json({
            userId:user._id,
            token:jwt.sign({userId:user._id},
                `${process.env.KEY_TOKEN}`,
                {expiresIn:'24h'}
                )
        })
        // res.status(201).json({message:'New user creer'}
        )
        .catch((err)=>res.status(500).json({err}))
    })
    .catch((err)=>res.status(500).json({err}))
}

//loin user 
exports.login =(req,res,next)=>{
    Users.findOne({numero:req.body.numero})
    .then(user=>{
        if(!user){
            return res.status(401).json({message:'Votre numero est incorrect'})
        }
        bcrypt.compare(req.body.password ,user.password)
        .then(valid=>{
            if(!valid){
                return res.status(401).json({message:'Votre mot de passe est incorrect'})
            }
            res.status(200).json({
                userId:user._id,
                token:jwt.sign({userId:user._id},
                    `${process.env.KEY_TOKEN}`,
                    {expiresIn:'24h'}
                    )
            })
        })
        .catch((err)=>res.status(500).json({err}))
    })
    .catch((err)=>res.status(500).json({err}))
}

//profile recuperation
exports.getOneUser = async(req,res,next)=>{
    const {id} = req.params
    console.log(id)
    Users
    .findOne({_id:id})
    .then((user)=>res.status(200).json(user))
    .catch((err)=>res.status(400).json({err}))
}

// const User = require('./models/user');
// const Profile = require('./models/profile');

exports.AllUsers =async(req,res,next)=>{
try{
const users = await Users.aggregate([
  {
    $lookup: {
      from: 'profiles',
      localField: '_id',//cetait _id
      foreignField: 'userId',//cetait userId
      as: 'profile',
    },
  },
  {
    $unwind:'$profile'
  }
//   {
//     $project: {
//        _id: 1,
//       userId:1,
//       photo:1,
//       nom:1,
//       prenom:1,
//       email:1,
//       numero:1,
//       biographie:'$biographie',
//       proffession:'$proffession',
//       categorie:1,
//       address: 1,
//       isPrestataire:1,
//       profile:1
//     },
//   },
])
res.status(200).json(users);
 
}catch(err){
    res.status(500).json(err)
}

}

//recuperation dun user et son profile
exports.getOneUserAndProfile = async(req,res,next)=>{
    
    
    try{
        const {id} = req.params
        console.log(id)
        const users = await Users.aggregate([
            {
                $match:{
                    _id:mongoose.Schema.Types.ObjectId(id)
                }
            },

            {
                $lookup: {
                  from: 'profiles',
                  localField: '_id',//cetait _id
                  foreignField: 'userId',//cetait userId
                  as: 'profile',
                },
              },
             
              {
                $unwind:'$profile'
              },
              
        ])
        res.status(200).json(users)
    }catch(err){
        res.status(500).json(err)
    }
}

//profile recuperation
exports.getUser = async(req,res,next)=>{
    const {userId} = req.params
    Users
    .find({_id:userId})
    .then((user)=>res.status(200).json(user))
    .catch((err)=>res.status(400).json({err}))
   
}


//modifier profile
exports.updateProfile=(req,res,next)=>{
    Users.findById({_id:req.params.id},{...req.body , _id:req.params.id})
    .then(()=>res.status(200).json({user:'modifier'}))
    .catch((err)=>res.status(400).json({err}))
}

//suppression de compte user
exports.userDelete =(req,res,next)=>{
    Users.findByIdAndRemove({_id:req.params.id})
    .then(()=>res.status(200).json({Confirmation:'Votre compte a ete supprimer'}))
    .catch((err)=>res.status(400).json({err}))
}

//obtenir statistic 
exports.usersStatistycs = async(req,res,next)=>{
    const date =new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1))
   
   try{
     const data =await Users.aggregate([
       { 
        // filtre afficher le moi inferieur ou egal au moi passe
        $match:{
            createdAt: {$gte: lastYear}
        }
       },
        { 
            // les champs(de la sortie) a afficher
            $project:{
                month:{$month:'$createdAt'},
            }
        },
        {
            // grouper la date de creation par mois et grouper la somme total par mois
            $group:{
                 _id:'$month',
                 total:{ $sum: 1}
            },
           
        },
    
       
    ]);
    res.status(200).send(data)
}catch(e){
res.status(500).json(e)
}
 }


 //obtenir user et son profile 
// exports.getUserAndProdile = async(req,res,next)=>{
   
//    try{
//      const users =await Users.aggregate([
//         {
//         $match:{}
//     },
//     {
//         $lookup:{
//             from:'profiles',
//             localField:"_id",
//             foreignField:'userId',
//             as:'profile'
//         }
//     },
//    {
//         $unwind:"$profile"
//     },
//     {
//         $project:{
//             _id:1,
//             nom:1,
//             prenom:1,
//             isPrestataire:1,
//             profile:1,
//             proffession:1,
           
            
//         },
        
//     },
    
       
//     ]);
//     res.status(200).json(users)
// }catch(e){
// res.status(500).json(e)
// }
//  }
 