const Joi = require('joi');

const postBook = Joi.object({
  sku: Joi.string().max(64).optional(),
  title: Joi.string().max(255).required(),
  author: Joi.string().max(200).optional(),
  publisher: Joi.string().max(200).optional(),
  description: Joi.string().optional(),
  price: Joi.number().precision(2).min(0).required(),
  stock: Joi.number().integer().min(0).default(0),
  is_active: Joi.boolean().default(true)
});

const updateStockValidation = Joi.object({
  quantityChange: Joi.number().required()
});

module.exports = {
  postBook,
  updateStockValidation
};