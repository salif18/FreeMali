const express = require('express');
const router = express.Router();
const videoCtrl = require('../controllers/videos')
const multer = require('../middlewares/videomulter')

router.post('/',multer,videoCtrl.createVideos );
router.get('/',videoCtrl.getAllVideos);
router.get('/:id',videoCtrl.getOneVideo)
router.get('/user/:userId', videoCtrl.getVideos)
router.put('/addComent/:id',videoCtrl.addCommentaires)
router.put('/delete/:objectId/commentaires/:id',videoCtrl.deleteCommentaires)
router.delete('/:userId/video/:id',videoCtrl.delVideos)
//route pour ajouter des likes
router.post('/:id/notations',videoCtrl.usersNotations)
module.exports = router;