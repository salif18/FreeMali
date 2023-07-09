//importation
const express = require('express')
const chatControllers = require('../controllers/chat')
const authMiddleware = require('../middlewares/auth')
//configuration de route
const router = express.Router()

//routage
//creer contact de chat
router.post('/',authMiddleware,chatControllers.CreatChat)
//recuperer chaque contact de chat
router.get('/:userId',authMiddleware,chatControllers.getChat)

module.exports = router
