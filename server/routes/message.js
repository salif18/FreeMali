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

//pour changer le status de conersationid
router.put('/status/:conversationId',messageControllers.changeStatus)

router.delete('/:conversationId',messageControllers.delMessage)
module.exports = router
