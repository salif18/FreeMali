//importation
const express =require('express')
const profileRouter = require('../controllers/profile')
const auth = require('../middlewares/auth')
//configuration
const router = express.Router()

//routage
router.post('/',profileRouter.CreatProfile)

// recuperation de tous profiles
router.get('/',profileRouter.getProfileAll)

//recuperer le profile unique dun utilisateur selectionner
router.get('/prestataire/:id',profileRouter.getOneprestaProfile)

// recuperer le profile par utilisateur unique qui est connecter a son compte
router.get('/:userId',profileRouter.getProfile)

// modification de profile par utilisateur
router.put('/:userId',profileRouter.modifyProfile)

//exportation
module.exports = router