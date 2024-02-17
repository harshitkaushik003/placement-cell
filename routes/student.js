const express = require('express');
const router = express.Router();

const studentController = require('../controllers/student_controller');

router.get('/', studentController.home);
router.get('/form', studentController.form);
router.post('/create', studentController.create);
router.get('/:id', studentController.profile);
module.exports = router;