const router = require('express').Router();
const authController = require('../controllers/authController');


router.post('/', (req, res) => authController().createAuth(req, res));
router.post('/authorize', (req, res) => authController().authorize(req, res));


module.exports = router;