const fs = require('fs');
const path = require('path');
const Product = require('../models/product');
const { CAST_ERROR, VALIDATION_ERROR, backendUrl } = require('../constants');
const BadReqError = require('../errors/BadReqError');
const NotFoundError = require('../errors/NotFoundError');

const { NODE_ENV } = process.env;

module.exports.getProducts = (req, res, next) => {
  Product.find({})
    .then((product) => res.send(product.reverse()))
    .catch(next);
};

module.exports.createProduct = (req, res, next) => {
  const {
    mainProduct,
    nameProduct,
    type,
    desc,
    price,
  } = req.body;

  const { name, data } = req.files.image;
  const pathImage = path.join(`${__dirname}/../uploads/products-image/${name}`);

  return Product.create({
    mainProduct,
    nameProduct,
    type,
    desc,
    price,
    image: {
      path: `${NODE_ENV === 'production' ? backendUrl.deploy : backendUrl.local}/uploads/products-image/${name}`,
      pathForLocal: pathImage,
    },
  })
    .then((product) => {
      fs.writeFileSync(pathImage, data);
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
  Product.findByIdAndDelete(req.params.productId.toString())
    .orFail(new NotFoundError('Продукт не найден'))
    .then((product) => {
      fs.rmSync(NODE_ENV === 'production' ? product.image.path : product.image.pathForLocal);
      res.send({ message: 'Продукт успешно удален.' });
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return next(new BadReqError('Переданы некорректные данные продукта.'), err);
      }
      return next(err);
    });
};
