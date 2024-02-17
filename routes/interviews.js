const express = require('express');
const router = express.Router();

const interviewController = require('../controllers/interview_controller');

router.get('/', interviewController.main);
router.get('/form', interviewController.form);
router.post('/create', interviewController.create);
router.get('/:id', interviewController.details)
module.exports = router;