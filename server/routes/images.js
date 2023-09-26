const express = require('express');
const router = express.Router();
const imagesCtrl = require('../controllers/images')
const multer = require('../middlewares/multer')

router.post('/',multer,imagesCtrl.createImages );
router.get('/',imagesCtrl.getAllImages);
router.get('/:id',imagesCtrl.getOneImage)
router.get('/user/:userId', imagesCtrl.getImages)
router.put('/addComent/:id',imagesCtrl.addCommentaires)
router.put('/delete/:objectId/commentaires/:id',imagesCtrl.deleteCommentaires)
router.delete('/:userId/image/:id',imagesCtrl.delImages)
//route pour ajouter des likes
router.post('/:id/notations',imagesCtrl.usersNotations)
module.exports = router;