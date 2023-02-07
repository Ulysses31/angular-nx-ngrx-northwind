import { Router } from 'express';
import CustomersCountOrderPerYear from '../data-access/customers-count-orders-per-year-repo';
import CustomersCountPerYear from '../data-access/customers-count-per-year-repo';
import EmployeesTotalSalesPerYear from '../data-access/employees-total-sales-per-year-repo';
import SalesTotalAmountPerYear from '../data-access/sales-total-amount-per-year-repo';
import SalesTotalPerCategory from '../data-access/sales-total-per-category-repo';
import SalesTotalPerYear from '../data-access/sales-total-per-year-repo';
const router = Router();

router.get('/sales-total-per-year', async (req, res) => {
  var salesTotalPerYear = new SalesTotalPerYear();
  salesTotalPerYear.browse((err, data) => {
    if (err) {
      return res.status(500).send({
        statusCode: res.statusCode,
        message:
          err.sqlMessage ||
          'Some error occurred while retrieving total sales per year.'
      });
    }
    return res.send({
      sales: data,
      statusCode: res.statusCode,
      error: ''
    });
  });
});

router.get('/sales-total-per-category/:year', async (req, res) => {
  var salesTotalPerCategory = new SalesTotalPerCategory();
  var year = req.params.year;
  salesTotalPerCategory.load(year, (err, data) => {
    if (err) {
      return res.status(500).send({
        statusCode: res.statusCode,
        message:
          err.sqlMessage ||
          'Some error occurred while retrieving total sales per category.'
      });
    }
    return res.send({
      sales: data,
      statusCode: res.statusCode,
      error: ''
    });
  });
});

router.get('/sales-total-amount-per-year', async (req, res) => {
  var salesTotalAmountPerYear = new SalesTotalAmountPerYear();
  salesTotalAmountPerYear.browse((err, data) => {
    if (err) {
      return res.status(500).send({
        statusCode: res.statusCode,
        message:
          err.sqlMessage ||
          'Some error occurred while retrieving total sales amount per year.'
      });
    }
    return res.send({
      sales: data,
      statusCode: res.statusCode,
      error: ''
    });
  });
});

router.get(
  '/employees-total-sales-per-year/:year',
  async (req, res) => {
    var employeesTotalSalesPerCategory =
      new EmployeesTotalSalesPerYear();
    var year = req.params.year;
    employeesTotalSalesPerCategory.load(year, (err, data) => {
      if (err) {
        return res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            'Some error occurred while retrieving employees total sales per year.'
        });
      }
      return res.send({
        employees: data,
        statusCode: res.statusCode,
        error: ''
      });
    });
  }
);

router.get('/customers-count-per-year', async (req, res) => {
  var customersCountPerYear = new CustomersCountPerYear();
  customersCountPerYear.browse((err, data) => {
    if (err) {
      return res.status(500).send({
        statusCode: res.statusCode,
        message:
          err.sqlMessage ||
          'Some error occurred while retrieving customers count per year.'
      });
    }
    return res.send({
      customers: data,
      statusCode: res.statusCode,
      error: ''
    });
  });
});

router.get(
  '/customers-count-orders-per-year/:year',
  async (req, res) => {
    var customersCountOrderPerYear = new CustomersCountOrderPerYear();
    var year = req.params.year;
    customersCountOrderPerYear.load(year, (err, data) => {
      if (err) {
        return res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            'Some error occurred while retrieving customers orders count per year.'
        });
      }
      return res.send({
        employees: data,
        statusCode: res.statusCode,
        error: ''
      });
    });
  }
);

export default router;
