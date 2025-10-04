const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./User")(sequelize, Sequelize.DataTypes);
const Role = require("./Role")(sequelize, Sequelize.DataTypes);
const UserSession = require("./UserSession")(sequelize, Sequelize.DataTypes);
const Book = require("./Book")(sequelize, Sequelize.DataTypes);
const Cart = require("./Cart")(sequelize, Sequelize.DataTypes);
const CartItem = require("./CartItem")(sequelize, Sequelize.DataTypes);

module.exports = {
  sequelize,
  User,
  Role,
  UserSession,
  Book,
  Cart,
  CartItem
};