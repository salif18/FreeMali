const Recomandations = require('../models/recomandationSchema');

exports.createRecomandation = ( req, res , next ) => {
    const recomandations = new Recomandations({ ...req.body})
    recomandations.save()
    .then(()=>res.status(201).json({message:'new recomandation'}))
    .catch((err) => res.status(400).json({err}))
};

exports.getAllRecomandations = (req, res, next) => {
    Recomandations.find().sort({createdAt:-1})
    .then((recomandation) => res.status(200).json(recomandation))
    .catch((err) => res.status(400).json({err}))
}