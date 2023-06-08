//importation
const Profile = require('../models/collectionProfile')

// notation 
exports.usersNotations =(req,res,next)=>{
    const {userId ,likes} =req.body
    const {id} = req.params
    console.log(userId,likes,id)
    Profile.findOne({userId:id})
    .then((like)=>{
       if(!like.usersLikes.includes(userId) && likes === 1){
          Profile.updateOne(
            {userId:id},
            {
                $inc:{likes: +1},
                $push:{usersLikes:userId}
            },
          ).then(()=>res.status(201).json({msg:'plus 1 likes'}))
          .catch((err)=>res.status(400).json({err}))
       };

       if(like.usersLikes.includes(userId) && likes === 0){
        Profile.updateOne(
          {userId:id},
          {
              $inc:{likes:-1},
              $pull:{usersLikes:userId},
          },
        ).then(()=>res.status(201).json({msg:'moins 1 like'}))
        .catch((err)=>res.status(400).json({err}))
     };

    //  dilikes

    if(!like.usersDisLikes.includes(userId) && likes === -1){
        Profile.updateOne(
          {userId:id},
          {
              $inc:{disLikes: +1},
              $push:{usersDisLikes:userId}
          },
        ).then(()=>res.status(201).json({msg:'plus 1 dislike '}))
        .catch((err)=>res.status(400).json({err}))
     };

     if(like.usersDisLikes.includes(userId) && likes === 0){
      Profile.updateOne(
        {userId:id},
        {
            $inc:{disLikes: -1},
            $pull:{usersDisLikes:userId},
        },
      ).then(()=>res.status(201).json({msg:'moins 1 dislike '}))
      .catch((err)=>res.status(400).json({err}))
   }


    }).catch((err)=>{
        console.log(err)
        res.status(404).json({err})
    })
}