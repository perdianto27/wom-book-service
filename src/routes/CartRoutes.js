const express = require('express');
const Router = express.Router();

const { verifyBasic  } = require('../middleware/auth/basic-auth');

const { validator  } = require('../middleware/validator');
const { addCartValidation  } = require('../middleware/validator/schema/CartValidation');

const { ROLE  } = require('../helpers/constant');
const cart = require('../controller/CartController');

Router.post('/', verifyBasic([ROLE.ID.CUSTOMER]), validator(addCartValidation), cart.addToCart);
Router.post('/:bookId', verifyBasic([ROLE.ID.CUSTOMER]), cart.removeFromCart);

module.exports = Router;