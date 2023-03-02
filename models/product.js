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
    desc: {
      type: String,
      minlength: 1,
      maxlength: 40,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      path: String,
      pathForLocal: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('product', productSchema);
