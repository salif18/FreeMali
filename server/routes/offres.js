//importation
const express = require('express')
const offreControllers = require('../controllers/offres')


//configuration de route 
const router = express.Router()

//routages  
router.post('/',offreControllers.CreatOffre)//ajouter des offres
router.get('/',offreControllers.getAllOffre)//obtenir tous les offres
router.get('/:id',offreControllers.getOneOffre)//obtenir un seul offre
router.delete('/:id',offreControllers.deleteOneOffre)//supprimer un seul offre
router.get('/user/:userId',offreControllers.getUserOffre)//obtenir son offre uniquement user
router.put('/:id',offreControllers.modifyOffre)//mofdifier une seul offre
router.put('/status/:offreId/proposition/:id',offreControllers.modifyOffreCommitStatut)//modifier commentaires
router.put('/newStatus/:id',offreControllers.modifyStatutOffre)
router.put('/user/delete/:offreId/commentaires/:id',offreControllers.deleteOffreCommit)//supprimer un commentaires dans le tableau offre
router.put('/addComent/:id',offreControllers.addCommentOffre)//ajouter des nouvelle commentaire dans le tableau offre
router.get('/statistic',offreControllers.statsOffres);
//exportation   
module.exports = router;   


