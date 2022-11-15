const mongoose = require('mongoose');
const UnauthorizedError = require('../errors/UnauthorizedError');

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 5,
      maxlength: 5,
      default: 'admin',
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

adminSchema.statics.findAdminByCredentials = function auth(name) {
  return this.findOne({ name })
    .select('+password')
    .then((admin) => {
      if (!admin) {
        return Promise.reject(new UnauthorizedError('Неправильные имя или пароль'));
      }
      return admin;
    });
};

module.exports = mongoose.model('admin', adminSchema);
