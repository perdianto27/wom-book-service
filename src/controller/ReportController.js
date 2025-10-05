const { StatusCodes } = require('http-status-codes');
const ExcelJS = require("exceljs");

const { Book, Order, OrderItem } = require("../models");
const { getSalesReportQuery } = require("../services/ReportService");

const Logger = require('../helpers/logger');
const logName = 'API Report';

const getCheckoutList = async (request, reply) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Book, as: 'book', attributes: ['title'] }]
        }
      ],
      order: [['created_at', 'DESC']]
    });

    return reply.status(StatusCodes.OK).send({
      responseCode: StatusCodes.OK,
      responseDesc: "Berhasil mengambil data transaksi checkout",
      data: orders
    });
  } catch (err) {
    Logger.log([logName, 'GET Checkout List', 'ERROR'], {
      message: `${err}`,
    });
    return reply
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({
        responseCode: StatusCodes.INTERNAL_SERVER_ERROR,
        responseDesc: "Gagal mengambil data"
    });
  }
};

const getSalesReport = async (request, reply) => {
  try {
    const books = await getSalesReportQuery();
    const reportData = books.map(book => {
      const sold = book.order_items.reduce((sum, item) => sum + item.quantity, 0);
      const revenue = book.order_items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
      return {
        id: book.id,
        sku: book.sku,
        title: book.title,
        stock: book.stock,
        sold,
        revenue
      };
    });

    return reply.status(StatusCodes.OK).json({
      responseCode: StatusCodes.OK,
      responseDesc: "Laporan penjualan berhasil diambil",
      data: reportData
    });
  } catch (err) {
    Logger.log([logName, "GET Sales Report", "ERROR"], { message: `${err}` });
    return reply
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({
        responseCode: StatusCodes.INTERNAL_SERVER_ERROR,
        responseDesc: "Gagal mengambil data"
    });
  }
};

const downloadSalesReport = async (request, reply) => {
  try {
    const books = await getSalesReportQuery();

    const reportData = books.map(book => {
      const sold = book.order_items.reduce((sum, item) => sum + item.quantity, 0);
      const revenue = book.order_items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
      return {
        sku: book.sku,
        title: book.title,
        stock: book.stock,
        sold,
        revenue
      };
    });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Laporan Penjualan");

    sheet.columns = [
      { header: "SKU", key: "sku", width: 20 },
      { header: "Judul Buku", key: "title", width: 40 },
      { header: "Stok Tersisa", key: "stock", width: 15 },
      { header: "Jumlah Terjual", key: "sold", width: 15 },
      { header: "Total Pendapatan (Rp)", key: "revenue", width: 25 }
    ];

    sheet.addRows(reportData);

    const today = new Date().toISOString().split('T')[0];
    const fileName = `laporan_penjualan_${today}.xlsx`;

    reply.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    reply.setHeader("Content-Disposition", "attachment; filename=" + fileName);

    await workbook.xlsx.write(reply);
    reply.end();
  } catch (err) {
    Logger.log([logName, "DOWNLOAD Sales Report", "ERROR"], { message: `${err}` });
    return reply
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({
        responseCode: StatusCodes.INTERNAL_SERVER_ERROR,
        responseDesc: "Gagal mengambil data"
    });
  }
};

module.exports = {
  getCheckoutList,
  getSalesReport,
  downloadSalesReport
};