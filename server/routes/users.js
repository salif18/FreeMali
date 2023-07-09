//importation
const express = require('express')
const usersControllers = require('../controllers/users')
const gestionRouter = require('../controllers/gestionutilisateur')
//configuration de route
const router = express.Router()

//routages vers le frontend
router.post('/signup',usersControllers.signup)
router.post('/login',usersControllers.login)
router.post('/reset-password',usersControllers.Reinitialisation)
router.post('/validation-password',usersControllers.Validation)
// recuprerer les donne de utilisateur seulement par son userId
router.get('/usersData/:userId',usersControllers.getUser)

//reucper tous les utilisateur et leur profile
router.get('/users&Profile',usersControllers.AllUsers)

//recuperer un seul utilisateur
router.get('/user/:id',usersControllers.getOneUser)


//routages vers poste admin
//changer le status prestataire approuver son inscription
router.put('/admin/:id/status',gestionRouter.approuPrestataire)

//exportation
module.exports = router