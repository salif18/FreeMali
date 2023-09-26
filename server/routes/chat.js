//importation
const express = require('express')
const chatControllers = require('../controllers/chat')

//configuration de route
const router = express.Router()

//routage
//creer contact de chat
router.post('/',chatControllers.CreatChat)
//recuperer chaque contact de chat
router.get('/:userId',chatControllers.getChat)

module.exports = router
