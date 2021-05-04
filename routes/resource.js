const router = require('express').Router();
const resourceController = require('../controllers/resourceController');

router.post('/create', (req, res) => resourceController().createResource(req, res));
router.post('/', (req, res) => resourceController().getResources(req, res));


module.exports = router;