const express = require('express')
const router = express.Router()
const multer = require('../middlewares/multer')
const demoCtrl = require('../controllers/demo')

router.post('/',multer,demoCtrl.createDemo)

module.exports = router