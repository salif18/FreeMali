//importation
const express = require('express')
const usersControllers = require('../controllers/users')

//configuration de route
const router = express.Router()

//routages
router.post('/signup',usersControllers.signup)
router.post('/login',usersControllers.login)
// recuprerer les donne de utilisateur seulement par son id
router.get('/users/:userId',usersControllers.getUser)

//reucper tous les utilisateur profiler
router.get('/utilisateur&Infos',usersControllers.Allprestataire)

//recuperer un seul utilisateur
router.get('/user/:id',usersControllers.getOneUser)

// recuperer utilisateur avec profile combiner
// router.get('/userAndprofile',usersControllers.getUserAndProdile)
//exportation
module.exports = router