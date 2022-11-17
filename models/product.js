const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    mainProduct: {
      type: Boolean,
      required: true,
    },
    nameProduct: {
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
    price: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: String,
      required: true,
    },
    image: {
      dataImage: { type: Buffer, unique: true },
      path: String,
    },
    count: {
      type: String,
      default: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('product', productSchema);
