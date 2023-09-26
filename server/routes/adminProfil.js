//importation des modules
const express = require('express');
const router = express.Router();

//importation du controllers
const profil_Ctrl = require('../controllers/adminProfil');
const auth= require('../middlewares/auth');
const multer = require('../middlewares/multer')
//ajouter nouveau profil
router.post('/',auth,multer, profil_Ctrl.createProfils);

//recuperer tous les profils par admin
router.get('/', profil_Ctrl.getAllProfils);

//recuperer un seul profil et les details par admin
router.get('/:id', profil_Ctrl.getOneProfil);

//route pour user de recuperer son profil 
router.get('/user/:userId', profil_Ctrl.getProfilForAdmin);

//modifier un profil
router.put('/update/:userId',auth,multer, profil_Ctrl.modifyProfils);

//modifier le champs photo
router.put('/photo/:userId',auth,multer, profil_Ctrl.modifyPhotoProfil);

//supprimer un profil
router.delete('/:id', profil_Ctrl.deleteProfils);

//exportation 
module.exports = router;