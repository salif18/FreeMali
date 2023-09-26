//importation
const express = require('express')
const messageControllers = require('../controllers/messageAdmin')

//configuration de route
const router = express.Router()
 
// routage
//pour enregistrer 
router.post('/',messageControllers.creatMessages)

router.get('/',messageControllers.getMessages);

router.delete('/:userId',messageControllers.delTousMessages)

//pour client obtenir son messages
router.get('/mycouriers/:userId',messageControllers.getUniqueMessages)

// obtenir un message
router.get('/one/:id',messageControllers.getOneMessages)

//supprimer le message 
router.delete('/delete/:id',messageControllers.delMessages)
 
//reponse
router.put('/reponse/:id', messageControllers.reponseMessage);

//marque lu admin
router.put('/adminlue/:courrierId', messageControllers.adminLueStatus)

//marque lu user
router.put('/userlue/:courrierId', messageControllers.userLueStatus)
module.exports = router