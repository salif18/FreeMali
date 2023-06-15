//importation
const Offres = require("../models/collectionOffres");

//ajouter nouvelle offre
exports.CreatOffre = (req, res, next) => {
  // const {userId,nom,prenom,email,numero,photo,address} = req.body
  const offres = new Offres({ ...req.body });
  offres
    .save()
    .then(() => res.status(201).json({ msg: "offre creer" }))
    .catch((err) => res.status(400).json({ err }));
};

// user recupere son offre
exports.getUserOffre = (req, res, next) => {
  const { userId } = req.params;
  Offres.find({ userId: userId })
    .then((offre) => res.status(200).json(offre))
    .catch((err) => res.status(400).json({ err }));
};

// application recupere tous offre
exports.getAllOffre = (req, res, next) => {
  Offres.find().sort({createdAt:-1})
    .then((offres) => res.status(200).json(offres))
    .catch((err) => res.status(400).json({ err }));
};

//recuperer un seul offre parmi les autre
exports.getOneOffre = (req, res, next) => {
  const { id } = req.params;
  Offres.findOne({ _id: id })
    .then((offre) => res.status(200).json(offre))
    .catch((err) => res.status(400).json({ err }));
};

// ajouter des commentaires a une seul offre
exports.addCommentOffre = (req, res, next) => {
  const { id } = req.params;
  const { commentaires } = req.body;
  Offres.updateOne(
    { _id: id },
    { $push: { commentaires: commentaires } },
    { new: true }
  )
    .then((offre) => res.status(201).json(offre))
    .catch((err) => res.status(400).json({ err }));
};

//supprimer son offre
exports.deleteOneOffre = (req, res, next) => {
  const { id } = req.params;
  Offres.deleteOne({ _id: id })
    .then((offre) => res.status(200).json(offre))
    .catch((err) => res.status(400).json({ err }));
};

//modifier son offre
exports.modifyOffre = (req, res, next) => {
  Offres.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ user: "modifier" }))
    .catch((err) => res.status(400).json({ err }));
};

//modifier les commemtaire dune seul offre
exports.modifyOffreCommit = (req, res, next) => {
  //recuperer userId de offres et id du commentaire
  const { userId, id, comments } = req.params;
  console.log(userId, id, comments);
  Offres.updateOne(
    { userId: userId },
    { $set: { commentaires:{ _id:id ,comments:comments }} } //modifier le contenu du commentaire
  )
    .then((res) => res.status(201).json({ msg: "modifier" }))
    .catch((err) => res.status(400).json(err));
};

//supprimer les commemtaire dune  offre
exports.deleteOffreCommit = (req, res, next) => {
  const { userId, id } = req.params; //recuperer userId de offres et id du commentaire
  Offres.updateOne(
    { userId: userId }, //filter le commentaire selon userId
    { $pull: { commentaires: { _id: id } } }, //supprimer le contenu du commentaire par son id
    { new: true }
  )
    .then((offre) => res.status(201).json(offre))
    .catch((err) => res.status(400).json({ err }));
};
