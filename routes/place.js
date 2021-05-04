const router = require('express').Router();
const placeController = require('../controllers/placeController');


router.get('/states', (req, res) => placeController().states(req, res));
router.post('/cities', (req, res) => placeController().cities(req, res));



module.exports = router;