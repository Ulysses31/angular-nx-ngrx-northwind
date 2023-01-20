import Supplier from '../data-access/supplier-repo';
import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
  var supplier = new Supplier();
  supplier.browse((err, data) => {
    if (err) {
      res.status(500).send({
        suppliers: [],
        statusCode: res.statusCode,
        error:
          err.message ||
          'Some error occurred while retrieving suppliers.'
      });
    }
    return res.send({
      suppliers: data,
      statusCode: res.statusCode,
      error: ''
    });
  });
});

router.get('/:id', async (req, res) => {
  var supplier = new Supplier(this);
  var id = req.params.id;
  supplier.load(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          suppliers: [],
          statusCode: res.statusCode,
          error: `Not found Supplier with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          suppliers: [],
          statusCode: res.statusCode,
          error: `Error retrieving Supplier with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        suppliers: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.post('/', async (req, res) => {
  var supplier = new Supplier(req.body);

  if (!req.body) {
    res.status(400).send({
      supplier: {},
      statusCode: res.statusCode,
      error: 'Content can not be empty!'
    });
  }

  supplier.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        supplier: {},
        statusCode: res.statusCode,
        error:
          err.message ||
          'Some error occurred while inserting new supplier.'
      });
    } else {
      return res.send({
        supplier: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.put('/:id', async (req, res) => {
  var id = req.params.id;
  var supplier = new Supplier(this);

  if (!req.body) {
    res.status(400).send({
      supplier: {},
      statusCode: res.statusCode,
      error: 'Content can not be empty!'
    });
  }

  supplier.update(id, req.body, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          supplier: {},
          statusCode: res.statusCode,
          error: `Not found Supplier with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          supplier: {},
          statusCode: res.statusCode,
          error: `Error updating Supplier with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        supplier: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.delete('/:id', async (req, res) => {
  var id = req.params.id;
  var supplier = new Supplier(this);
  supplier.delete(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          supplier: {},
          statusCode: res.statusCode,
          error: `Not found Supplier with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          supplier: {},
          statusCode: res.statusCode,
          error: `Could not delete Supplier with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        supplier: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

export default router;
