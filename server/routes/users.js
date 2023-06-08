//importation
const express = require('express')
const usersControllers = require('../controllers/users')

//configuration de route
const router = express.Router()

//routages
router.post('/signup',usersControllers.signup)
router.post('/login',usersControllers.login)

// recuprerer les donne de utilisateur seulement par son userId
router.get('/usersData/:userId',usersControllers.getUser)

//reucper tous les utilisateur profiler
router.get('/users&Profile',usersControllers.AllUsers)

//recuperer un seul utilisateur
router.get('/user/:id',usersControllers.getOneUser)


//exportation
module.exports = router