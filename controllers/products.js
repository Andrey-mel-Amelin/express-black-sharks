const Product = require('../models/product');
const { CAST_ERROR, VALIDATION_ERROR } = require('../constants');
const BadReqError = require('../errors/BadReqError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getProduct = (req, res, next) => {
  Product.find({})
    .then((product) => res.send(product))
    .catch(next);
};

module.exports.createProduct = (req, res, next) => {
  Product.create(req.body)
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      if (err.message === VALIDATION_ERROR) {
        return next(new BadReqError('Переданы некорректные данные при создании продукта.'), err);
      }
      return next(err);
    })
    .catch(next);
};

module.exports.deleteProduct = (req, res, next) => {
  Product.findById(req.params.productId)
    .orFail(new NotFoundError('Продукт не найден'))
    .then((product) => {
      Product.findByIdAndDelete(product._id.toString()).then(() => {
        res.send(product);
      });
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return next(new BadReqError('Переданы некорректные данные продукта.'), err);
      }
      return next(err);
    });
};
