const router = require('express').Router();
const { login, logout, getAdmin } = require('../controllers/admin');
const auth = require('../middlewares/auth');

router.get('/login', auth, getAdmin);
router.post('/login', login);
router.delete('/logout', logout);

module.exports = router;
