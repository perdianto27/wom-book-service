const express = require('express');
const Router = express.Router();

const auth = require('./AuthRoutes');
const user = require('./UserRoutes');
const book = require('./BookRoutes');
const cart = require('./CartRoutes');
const payment = require('./PaymentRoutes');
const report = require('./ReportRoutes');

Router.use('/auth', auth);
Router.use('/user', user);
Router.use('/book', book);
Router.use('/cart', cart);
Router.use('/payment', payment);
Router.use('/report', report);

module.exports = Router;