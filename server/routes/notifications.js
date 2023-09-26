//importation
const express = require('express')
const notificationControllers = require('../controllers/notifications')

//configuration de route
const router = express.Router()

//routage
//add de notification
router.post('/',notificationControllers.creatNotifications)

//recuperer son notification
router.get('/receiver/:receiverId',notificationControllers.getnotifications)

//recuperer notification admin
router.get('/receiver/admin/:userId',notificationControllers.getnotificationsAdmin)

//recuperer notifications ds offres
router.get('/status',notificationControllers.getnotificationsOffre)

//mis a jours du champs status de notification
router.put('/status/:id',notificationControllers.changeStatus)

//supprimer une notification
router.delete('/del/:id',notificationControllers.delNotifications)

module.exports = router