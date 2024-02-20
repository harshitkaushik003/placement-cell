const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
const { downloadCsv } = require('../controllers/csv_Controller');

//setting up paths for all the routes
router.get('/', homeController.home);
router.get('/download-csv', downloadCsv);
router.use('/user', require('./user'));
router.use('/students', require('./student'));
router.use('/interviews', require('./interviews'));

module.exports = router;