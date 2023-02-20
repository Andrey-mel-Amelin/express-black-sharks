const jwt = require('jsonwebtoken');
const { CAST_ERROR } = require('../constants');
const BadReqError = require('../errors/BadReqError');
const NotFoundError = require('../errors/NotFoundError');
const Admin = require('../models/admin');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getAdmin = (req, res, next) => {
  Admin.findById(req.user._id)
    .orFail(new NotFoundError('Администратор не найден.'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return next(new BadReqError('Передан некорректный _id для поиска администратора.'));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { name, password } = req.body;

  return Admin.findAdminByCredentials(name, password)
    .then((admin) => {
      const token = jwt.sign({ _id: admin._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'None',
          secure: true,
        })
        .send({ message: 'Админ авторизирован.' });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  const { jwtToken } = req.cookies;

  if (!jwtToken) {
    return res.send({ message: 'Нет авторизованных админов.' });
  }
  return res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }).send({ message: 'Админ вышел.' });
};
