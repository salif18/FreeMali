//importation
const express =require('express')
const profileRouter = require('../controllers/profile')
const likesRouter = require('../controllers/likes')
const avisRouter =require('../controllers/avis')
const authMiddleware = require('../middlewares/auth')
const multer = require('../middlewares/multer')

//configurations 
const router = express.Router() 
  

//routage 
//poster un profile
router.post('/',authMiddleware,multer,profileRouter.CreatProfile)

// recuperation de tous profiles
router.get('/',authMiddleware,profileRouter.getProfileAll)

//recuperer le profile unique dun utilisateur selectionner
router.get('/prestaProfile/:id',profileRouter.getOneprestaProfile)
 
// recuperer le profile par utilisateur unique qui est connecter a son compte
router.get('/myProfile/:userId',profileRouter.getProfile)

// modification de profile par utilisateur
router.put('/updateclient/:userId',authMiddleware,multer,profileRouter.modifyProfile) 
 
// modification de profile par uchamp
router.put('/:userId/fieldPhoto',authMiddleware,multer,profileRouter.modifyProfilePhoto)
 
//route pour ajouter des likes
router.post('/:id/notations',likesRouter.usersNotations)

//route pour ajouter des avis sur prestataire
router.put('/avis/:id',avisRouter.addAvis)

// route pur supprimer son commentaire sur le client
router.put('/delete/:userId/avis/:id',avisRouter.deleteAvisCommit)
 

//exportation
module.exports = router