const { celebrate, Joi } = require('celebrate');

const validId = (typeId) => celebrate({
  params: Joi.object().keys({
    [typeId]: Joi.string().hex().length(24),
  }),
});

module.exports = {
  validId,
};
