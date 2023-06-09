const Users = require('../models/collectionUsers')

//appouvee le status de users (accepter son inscription en tant que prestataire sur le site)
exports.approuPrestataire = (req,res,next)=>{
    const {id} = req.params
    const {newStatus} = req.body
    Users
      .findOneAndUpdate(
        {_id:id},//recuperer objet par son id
        {$set:{status:newStatus}},//mis a jour le champs status au nouveau status
        {new:true}
      )
      .then((user)=>res.status(201).json({status:user.status}))
      .catch((err)=>res.status(400).json({err}))
}