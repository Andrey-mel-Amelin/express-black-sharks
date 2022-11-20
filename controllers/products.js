const fs = require('fs');
const path = require('path');
const Product = require('../models/product');
const { CAST_ERROR, VALIDATION_ERROR } = require('../constants');
const BadReqError = require('../errors/BadReqError');
const NotFoundError = require('../errors/NotFoundError');
const DublicateKeyError = require('../errors/DublicateKeyError');

module.exports.getProducts = (req, res, next) => {
  Product.find({})
    .then((product) => res.send(product))
    .catch(next);
};

module.exports.createProduct = (req, res, next) => {
  const {
    mainProduct,
    nameProduct,
    type,
    about,
    price,
  } = req.body;

  const { name, data } = req.files.image;
  const pathImage = path.join(`${__dirname}/../uploads/products-image/${name}`);
  if (fs.existsSync(pathImage)) {
    return next(new DublicateKeyError('Изображение уже есть на сервере.'));
  }

  return Product.create({
    mainProduct,
    nameProduct,
    type,
    about,
    price,
    image: {
      path: `http://localhost:3001/image/${name}`,
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
  Product.findById(req.params.productId)
    .orFail(new NotFoundError('Продукт не найден'))
    .then((product) => {
      Product.findByIdAndDelete(product._id.toString()).then(() => {
        fs.rmSync(product.image.path);
        res.send({ message: 'Продукт успешно удален.' });
      });
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return next(new BadReqError('Переданы некорректные данные продукта.'), err);
      }
      return next(err);
    });
};
