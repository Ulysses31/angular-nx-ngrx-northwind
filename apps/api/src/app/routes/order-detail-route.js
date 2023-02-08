import { Router } from 'express';
import OrderDetail from '../data-access/order-detail-repo';
const router = Router();

router.get('/', async (req, res) => {
  var orderDetail = new OrderDetail();
  orderDetail.browse((err, data) => {
    if (err) {
      res.status(500).send({
        statusCode: res.statusCode,
        error:
          err.sqlMessage ||
          'Some error occurred while retrieving orderDetails.'
      });
    }
    return res.send({
      orderDetails: data,
      statusCode: res.statusCode,
      error: ''
    });
  });
});

router.get('/:id', async (req, res) => {
  var orderDetail = new OrderDetail(this);
  var id = req.params.id;
  orderDetail.load(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          statusCode: res.statusCode,
          message: `Not found OrderDetail with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Error retrieving OrderDetail with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        orderDetails: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.post('/', async (req, res) => {
  var orderDetail = new OrderDetail(req.body);

  if (!req.body) {
    res.status(400).send({
      statusCode: res.statusCode,
      message: 'Content can not be empty!'
    });
  }

  if (orderDetail.ProductID.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Product is required!'
    });
  }

  orderDetail.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        statusCode: res.statusCode,
        message:
          err.sqlMessage ||
          'Some error occurred while inserting new orderDetail.'
      });
    } else {
      return res.send({
        orderDetail: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.put('/:id', async (req, res) => {
  var id = req.params.id;
  var orderDetail = new OrderDetail(this);

  if (!req.body) {
    res.status(400).send({
      statusCode: res.statusCode,
      message: 'Content can not be empty!'
    });
  }

  if (orderDetail.ProductID.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Product is required!'
    });
  }

  orderDetail.update(id, req.body, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          statusCode: res.statusCode,
          message: `Not found OrderDetail with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Error updating OrderDetail with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        orderDetail: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.delete('/:id', async (req, res) => {
  var id = req.params.id;
  var orderDetail = new OrderDetail(this);

  orderDetail.delete(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          statusCode: res.statusCode,
          message: `Not found OrderDetail with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Could not delete OrderDetail with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        orderDetail: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

export default router;
