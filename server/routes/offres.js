//importation
const express = require('express')
const offreControllers = require('../controllers/offres')

//configuration de route
const router = express.Router()

//routages
router.post('/',offreControllers.CreatOffre)//ajouter des offres
router.get('/',offreControllers.getAllOffre)//obtenir tous les offres
router.get('/:id',offreControllers.getOneOffre)//obtenir un seul offre
router.get('/user/:userId',offreControllers.getUserOffre)//obtenir son offre uniquement 
router.put('/:id',offreControllers.modifyOffre)//mofdifier son offre
router.put('/addComent/:id',offreControllers.addCommentOffre)//ajouter des nouvelle commentaire
// router.delete('/',offreControllers.getUser)
//exportation
module.exports = router