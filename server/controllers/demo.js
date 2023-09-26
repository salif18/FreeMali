const Demo = require('../models/demo')

exports.createDemo =(req,res)=>{
   const photo = req.file
   const demo = new Demo({
    photo:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   })
   demo.save()
   .then(()=>res.status(201).json(
    console.log('enregistre')
   ))
   .catch((err)=>res.status(400).json(console.log(err)))
} 