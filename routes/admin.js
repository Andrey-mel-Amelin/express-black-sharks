const router = require('express').Router();
const { login, logout } = require('../controllers/admin');

router.post('/', login);
router.delete('/', logout);

module.exports = router;
