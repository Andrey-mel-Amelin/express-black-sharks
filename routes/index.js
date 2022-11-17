const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

const allowedCors = require('../middlewares/allowedCors');

router.use(allowedCors);

router.use('/api/admin', require('./admin'));
router.use('/api/products', require('./products'));

router.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден.'));
});

module.exports = router;
