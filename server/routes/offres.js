//importation
const express = require('express')
const offreControllers = require('../controllers/offres')
const authMiddleware = require('../middlewares/auth')

//configuration de route 
const router = express.Router()

//routages 
router.post('/',authMiddleware,offreControllers.CreatOffre)//ajouter des offres
router.get('/',offreControllers.getAllOffre)//obtenir tous les offres
router.get('/:id',authMiddleware,offreControllers.getOneOffre)//obtenir un seul offre
router.delete('/:id',authMiddleware,offreControllers.deleteOneOffre)//supprimer un seul offre
router.get('/user/:userId',authMiddleware,offreControllers.getUserOffre)//obtenir son offre uniquement user
router.put('/:id',authMiddleware,offreControllers.modifyOffre)//mofdifier une seul offre
router.put('/modify/:userId/commentaires/:id',authMiddleware,offreControllers.modifyOffreCommit)//modifier commentaires
router.put('/user/delete/:userId/commentaires/:id',authMiddleware,offreControllers.deleteOffreCommit)//supprimer un commentaires dans le tableau offre
router.put('/addComent/:id',authMiddleware,offreControllers.addCommentOffre)//ajouter des nouvelle commentaire dans le tableau offre

//exportation   
module.exports = router; 