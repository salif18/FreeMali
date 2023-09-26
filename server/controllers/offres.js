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
  Offres.find({ userId: userId }).sort({createdAt:-1})
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

//modifier le status de offe
exports.modifyStatutOffre = (req, res, next) => {
  const {id } = req.params
  const { newStatus} = req.body
  Offres.updateOne(
    { _id:id }, 
    { $set:{prise:newStatus}},
    {new:true}
    )
    .then(() => res.status(200).json({ user: "modifier" }))
    .catch((err) => res.status(400).json({ err }));
};

//modifier les commemtaire dune seul offre
exports.modifyOffreCommitStatut = async(req, res, next) => {
  const { offreId, id } = req.params;
  const { newStatus } = req.body;

  try {
    const offre = await Offres.updateOne(
      {
        _id: offreId,
        'commentaires._id': id // Filtrez le commentaire spécifique par son ID
      },
      {
        $set: { 'commentaires.$.accept': newStatus } // Mettez à jour le champ "accept" dans le commentaire filtré
      },
      { new: true }
    );

    if (offre.nModified === 1) {
      res.status(201).json(offre);
    } else {
      res.status(404).json({ message: 'Commentaire non trouvé' });
    }
  } catch (err) {
    res.status(400).json(err); 
  }
};       

//supprimer les commemtaire dune  offre
exports.deleteOffreCommit = (req, res, next) => {
  const { offreId, id } = req.params; //recuperer userId de offres et id du commentaire
  console.log(offreId , id)
  Offres.updateOne(
    { _id: offreId }, //filter le commentaire selon userId
    { $pull: { commentaires: { _id: id } } }, //supprimer le contenu du commentaire par son id
    { new: true }
  )
    .then((offre) => res.status(201).json(offre))
    .catch((err) => res.status(400).json({ err }));
};


//STATYSTICS des offres TO LOG
exports.statsOffres = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const stats = await Offres.aggregate(
      [
        {
          $project: {
              month: { $month: '$createdAt' } // Extraction du mois à partir de la date de création
          }
      },
      {
          $group: {
              _id: '$month', // Regroupement par mois
              count: { $sum: 1 } // Comptage du nombre d'offres par mois
          }
      },
      {
          $sort: {
              _id: 1 // Tri par mois croissant
          }
      }
    ]);
    res.status(200).send(stats);
  } catch (err) {
    res.status(500).json({ err });
  }  
};