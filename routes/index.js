const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);
router.use('/user', require('./user'));
router.use('/students', require('./student'));
router.use('/interviews', require('./interviews'));

module.exports = router;