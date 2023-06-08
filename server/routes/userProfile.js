//importation
const express =require('express')
const profileRouter = require('../controllers/profile')
const likesRouter = require('../controllers/likes')
const avisRouter =require('../controllers/avis')
const auth = require('../middlewares/auth')
//configuration
const router = express.Router()

//routage
router.post('/',profileRouter.CreatProfile)

// recuperation de tous profiles
router.get('/',profileRouter.getProfileAll)

//recuperer le profile unique dun utilisateur selectionner
router.get('/yourProfile/:id',profileRouter.getOneprestaProfile)

// recuperer le profile par utilisateur unique qui est connecter a son compte
router.get('/myProfile/:userId',profileRouter.getProfile)

// modification de profile par utilisateur
router.put('/:userId',profileRouter.modifyProfile)

//route pour ajouter des likes
router.post('/:id/notations',likesRouter.usersNotations)

//route pour ajouter des avis sur prestataire
router.put('/avis/:id',avisRouter.addAvis)

// route pur supprimer son commentaire sur le client
router.put('/delete/:userId/avis/:id',avisRouter.deleteAvisCommit)


//exportation
module.exports = router