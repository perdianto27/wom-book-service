const { Book, OrderItem, Order } = require("../models");
const Logger = require("../helpers/logger");

const logName = "Report Service";

const getSalesReportQuery = async () => {
  try {
    const books = await Book.findAll({
      attributes: ["id", "sku", "title", "stock"],
      include: [
        {
          model: OrderItem,
          as: "order_items",
          attributes: ["quantity", "unit_price"],
          include: [
            {
              model: Order,
              as: "order",
              where: { status: "paid" },
              attributes: []
            }
          ]
        }
      ]
    });

    return books;
  } catch (err) {
    Logger.log([logName, "GET Sales Report Query", "ERROR"], {
      message: `${err}`,
    });
    throw err;
  }
};

module.exports = {
  getSalesReportQuery
};