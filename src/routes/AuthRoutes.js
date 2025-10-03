const express = require('express');
const Router = express.Router();

const auth = require('../controller/AuthController');

Router.post('/login', auth.postLogin);

module.exports = Router;