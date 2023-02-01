import Customer from '../data-access/customer-repo';
import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
  var customer = new Customer();
  customer.browse((err, data) => {
    if (err) {
      res.status(500).send({
        statusCode: res.statusCode,
        message:
          err.sqlMessage ||
          'Some error occurred while retrieving customers.'
      });
    }
    return res.send({
      customers: data,
      statusCode: res.statusCode,
      error: ''
    });
  });
});

router.get('/:id', async (req, res) => {
  var customer = new Customer(this);
  var id = req.params.id;
  customer.load(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          statusCode: res.statusCode,
          message: `Not found Customer with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Error retrieving Customer with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        customers: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.post('/', async (req, res) => {
  var customer = new Customer(req.body);
  if (!req.body) {
    res.status(400).send({
      statusCode: res.statusCode,
      error: 'Content can not be empty!'
    });
  }

  if (customer.CompanyName.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'CompanyName is required!'
    });
  }

  customer.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        statusCode: res.statusCode,
        error:
          err.sqlMessage ||
          'Some error occurred while inserting new customer.'
      });
    } else {
      return res.send({
        customer: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.put('/:id', async (req, res) => {
  var id = req.params.id;
  var customer = new Customer(req.body);

  if (!req.body) {
    res.status(400).send({
      statusCode: res.statusCode,
      message: 'Content can not be empty!'
    });
  }

  if (customer.CompanyName.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'CompanyName is required!'
    });
  }

  customer.update(id, req.body, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          statusCode: res.statusCode,
          message: `Not found Customer with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Error updating Customer with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        customer: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.delete('/:id', async (req, res) => {
  var id = req.params.id;
  var customer = new Customer(this);
  customer.delete(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          statusCode: res.statusCode,
          message: `Not found Customer with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Could not delete Customer with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        customer: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

export default router;
