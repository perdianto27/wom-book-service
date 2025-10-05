const express = require('express');
const Router = express.Router();

const { verifyBasic  } = require('../middleware/auth/basic-auth');

const { ROLE  } = require('../helpers/constant');
const report = require('../controller/ReportController');

Router.get('/checkout-list', verifyBasic([ROLE.ID.ADMIN]), report.getCheckoutList);
Router.get('/sales', verifyBasic([ROLE.ID.ADMIN]), report.getSalesReport);
Router.get('/sales/download', verifyBasic([ROLE.ID.ADMIN]), report.downloadSalesReport);

module.exports = Router;