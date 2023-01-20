import Product from '../data-access/product-repo';
import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
  var product = new Product();
  product.browse((err, data) => {
    if (err) {
      res.status(500).send({
        products: [],
        statusCode: res.statusCode,
        error:
          err.message ||
          'Some error occurred while retrieving products.'
      });
    }
    return res.send({
      products: data,
      statusCode: res.statusCode,
      error: ''
    });
  });
});

router.get('/:id', async (req, res) => {
  var product = new Product(this);
  var id = req.params.id;
  product.load(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          products: [],
          statusCode: res.statusCode,
          error: `Not found Product with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          products: [],
          statusCode: res.statusCode,
          error: `Error retrieving Product with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        products: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.post('/', async (req, res) => {
  var product = new Product(req.body);

  if (!req.body) {
    res.status(400).send({
      product: {},
      statusCode: res.statusCode,
      error: 'Content can not be empty!'
    });
  }

  product.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        product: {},
        statusCode: res.statusCode,
        error:
          err.message ||
          'Some error occurred while inserting new product.'
      });
    } else {
      return res.send({
        product: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.put('/:id', async (req, res) => {
  var id = req.params.id;
  var product = new Product(this);

  if (!req.body) {
    res.status(400).send({
      product: {},
      statusCode: res.statusCode,
      error: 'Content can not be empty!'
    });
  }

  product.update(id, req.body, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          product: {},
          statusCode: res.statusCode,
          error: `Not found Product with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          product: {},
          statusCode: res.statusCode,
          error: `Error updating Product with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        product: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.delete('/:id', async (req, res) => {
  var id = req.params.id;
  var product = new Product(this);
  product.delete(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          product: {},
          statusCode: res.statusCode,
          error: `Not found Product with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          product: {},
          statusCode: res.statusCode,
          error: `Could not delete Product with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        product: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

export default router;
