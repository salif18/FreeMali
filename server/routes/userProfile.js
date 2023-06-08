//importation
const express =require('express')
const profileRouter = require('../controllers/profile')
const likesRouter = require('../controllers/likes')
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

//exportation
module.exports = router