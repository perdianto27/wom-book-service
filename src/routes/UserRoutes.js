const express = require('express');
const Router = express.Router();

const { verifyBasic  } = require('../middleware/auth/basic-auth');

const { validator  } = require('../middleware/validator');
const { postUserValidation  } = require('../middleware/validator/schema/UserValidation');

const user = require('../controller/UserController');

Router.post('/', verifyBasic(), validator(postUserValidation), user.postUser);
Router.get('/', verifyBasic(), user.getUser);

module.exports = Router;