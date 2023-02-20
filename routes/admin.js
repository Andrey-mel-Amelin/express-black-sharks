const router = require('express').Router();
const { login, logout, getAdmin } = require('../controllers/admin');

router.get('login', getAdmin);
router.post('/login', login);
router.delete('/logout', logout);

module.exports = router;
