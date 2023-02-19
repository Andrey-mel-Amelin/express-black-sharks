const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const { NODE_ENV, JWT_SECRET } = process.env;

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
