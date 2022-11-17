const router = require('express').Router();
const { validId } = require('../middlewares/joiValidation');
const { getProducts, createProduct, deleteProduct } = require('../controllers/products');
const auth = require('../middlewares/auth');

router.get('/', getProducts);
router.post('/', auth, createProduct);
router.delete('/:productId', auth, validId('productId'), deleteProduct);

module.exports = router;
