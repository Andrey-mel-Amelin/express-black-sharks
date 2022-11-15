const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    mainProduct: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      minlength: 1,
      maxlength: 40,
      required: true,
    },
    type: {
      type: String,
      minlength: 1,
      maxlength: 40,
      required: true,
    },
    about: {
      type: String,
      minlength: 1,
      maxlength: 40,
      required: true,
    },
    count: {
      type: String,
      default: 1,
    },
    price: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('product', productSchema);
