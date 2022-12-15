import Order from '../data-access/order-repo';
import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
  var order = new Order();
  order.browse((err, data) => {
    if (err) {
      res.status(500).send({
        orders: [],
        statusCode: res.statusCode,
        error:
          err.message ||
          'Some error occurred while retrieving orders.'
      });
    }
    return res.send({
      orders: data,
      statusCode: res.statusCode,
      error: ''
    });
  });
});

router.get('/:id', async (req, res) => {
  var order = new Order(this);
  var id = req.params.id;
  order.load(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          orders: [],
          statusCode: res.statusCode,
          error: `Not found Order with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          orders: [],
          statusCode: res.statusCode,
          error: `Error retrieving Order with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        orders: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.post('/', async (req, res) => {
  var order = new Order(req.body);

  if (!req.body) {
    res.status(400).send({
      order: {},
      statusCode: res.statusCode,
      error: 'Content can not be empty!'
    });
  }

  order.create(order, (err, data) => {
    if (err) {
      res.status(500).send({
        orders: [],
        statusCode: res.statusCode,
        error:
          err.message ||
          'Some error occurred while inserting new order.'
      });
    } else {
      return res.send({
        order: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.put('/:id', async (req, res) => {
  var id = req.params.id;
  var order = new Order(this);

  if (!req.body) {
    res.status(400).send({
      order: {},
      statusCode: res.statusCode,
      error: 'Content can not be empty!'
    });
  }

  order.update(id, req.body, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          order: {},
          statusCode: res.statusCode,
          error: `Not found Order with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          order: {},
          statusCode: res.statusCode,
          error: `Error updating Order with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        order: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.delete('/:id', async (req, res) => {
  var id = req.params.id;
  var order = new Order(this);
  order.delete(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          order: {},
          statusCode: res.statusCode,
          error: `Not found Order with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          order: {},
          statusCode: res.statusCode,
          error: `Could not delete Order with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        order: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

export default router;
