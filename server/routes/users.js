//importation
const express = require('express')
const usersControllers = require('../controllers/users')
const gestionRouter = require('../controllers/gestionutilisateur');
const admin_ctrl = require('../controllers/admin');
const admin_recup = require('../controllers/adminRecuper');

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
  
//route admin pour statistiques des users 
router.get('/users/statistiques', usersControllers.statsUsers);

//routages vers poste admin
//changer le status prestataire approuver son inscription
router.put('/admin/:id/status',gestionRouter.approuPrestataire)
router.put('/admin/isprestataire/status/:id/',usersControllers.modifyUser)
//administrateur
router.post('/admin/signup',admin_ctrl.signup);
router.post('/admin/login',admin_ctrl.login);
router.post('/admin/reset', admin_recup.reset);
router.post('/admin/validPassword', admin_recup.Validation)
router.get('/admin/data', admin_ctrl.getAdmin_data);
router.get('/admin/del', admin_ctrl.deleteAdmin);

//exportation
module.exports = router