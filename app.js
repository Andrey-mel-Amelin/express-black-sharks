const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
require('dotenv').config();
const routes = require('./routes');
const centralizedErrorHandler = require('./middlewares/centralizedErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001, MONGO_URL = 'mongodb://127.0.0.1:27017/blacksharks' } = process.env;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(fileUpload({}));
app.use('/uploads/products-image/', express.static(`${__dirname}/uploads/products-image`));
app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(centralizedErrorHandler);

app.listen(PORT);
