const express = require('express');
const router = express.Router();
const recomandation_controllers = require('../controllers/recomandation');

router.post('/', recomandation_controllers.createRecomandation);
router.get('/', recomandation_controllers.getAllRecomandations);

module.exports = router;