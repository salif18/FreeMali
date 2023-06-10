//importation
const express = require('express')
const messageControllers = require('../controllers/message')

//configuration de route
const router = express.Router()

// routage
//pour enregistrer 
router.post('/',messageControllers.CreatMessage)
//pour obtenir chaque conversation par son conersationid
router.get('/:conversationId',messageControllers.getMessage)

module.exports = router
