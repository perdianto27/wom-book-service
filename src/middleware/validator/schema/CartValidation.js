const Joi = require('joi');

const addCartValidation = Joi.object({
  bookId: Joi.string().guid({ version: 'uuidv4' }).required(),
  quantity: Joi.number().integer().min(1).default(1)
});

module.exports = {
  addCartValidation
};