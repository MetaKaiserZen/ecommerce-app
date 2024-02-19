const { Router } = require('express');

const LoginController = require('../controllers/LoginController');
const RegisterController = require('../controllers/RegisterController');

const router = Router();

router.post('/login', LoginController.login());

router.get('/verify/:token', RegisterController.verify());
router.post('/register', RegisterController.register());

module.exports = router;
