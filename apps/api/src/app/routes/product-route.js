import { Router } from 'express';
import Product from '../data-access/product-repo';
const router = Router();

router.get('/', async (req, res) => {
  var product = new Product();
  product.browse((err, data) => {
    if (err) {
      res.status(500).send({
        statusCode: res.statusCode,
        message:
          err.sqlMessage ||
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
          statusCode: res.statusCode,
          error: `Not found Product with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Error retrieving Product with id ${req.params.id}`
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
      statusCode: res.statusCode,
      message: 'Content can not be empty!'
    });
  }

  if (product.ProductName.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'ProductName is required!'
    });
  }

  if (product.Discontinued === '') {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Discontinued is required!'
    });
  }

  product.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        statusCode: res.statusCode,
        error:
          err.sqlMessage ||
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
  var product = new Product(req.body);

  if (!req.body) {
    res.status(400).send({
      statusCode: res.statusCode,
      message: 'Content can not be empty!'
    });
  }

  if (product.ProductName.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'ProductName is required!'
    });
  }

  if (product.Discontinued === '') {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Discontinued is required!'
    });
  }

  product.update(id, req.body, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          statusCode: res.statusCode,
          message: `Not found Product with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Error updating Product with id ${req.params.id}`
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
          statusCode: res.statusCode,
          message: `Not found Product with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Could not delete Product with id ${req.params.id}`
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
