//importation
const express = require('express')
const conversControllers = require('../controllers/conversations')

//configuration de route
const router = express.Router()

//routages
router.post('/',conversControllers.creatConversations)
router.get('/userId/:userId',conversControllers.getConversations)
router.get('/:id',conversControllers.getOneConversations)
router.put('/:id',conversControllers.updateConversations)
router.delete('/:id',conversControllers.delConversations)
//exportation
module.exports = router