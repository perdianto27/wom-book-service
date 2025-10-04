const express = require('express');
const Router = express.Router();

const { verifyBasic  } = require('../middleware/auth/basic-auth');

const { validator  } = require('../middleware/validator');
const { paymentValidation  } = require('../middleware/validator/schema/PaymentValidation');

const { ROLE  } = require('../helpers/constant');
const payment = require('../controller/PaymentController');

Router.post('/', verifyBasic([ROLE.ID.CUSTOMER]), validator(paymentValidation), payment.createPayment);
Router.post('/callback', payment.paymentCallback);

module.exports = Router;