import Order from '../data-access/order-repo';
import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
  var order = new Order();
  order.browse((err, data) => {
    if (err) {
      res.status(500).send({
        statusCode: res.statusCode,
        message:
          err.sqlMessage ||
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
          statusCode: res.statusCode,
          message: `Not found Order with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Error retrieving Order with id ${req.params.id}`
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
      statusCode: res.statusCode,
      message: 'Content can not be empty!'
    });
  }

  if (order.CustomerID.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Customer is required!'
    });
  }

  if (order.EmployeeID.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Employee is required!'
    });
  }

  if (order.OrderDate.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Order date is required!'
    });
  }

  if (order.ShippedDate.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Shipped date is required!'
    });
  }

  if (order.ShipAddress.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Shipp address is required!'
    });
  }

  if (order.ShipCity.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Ship city is required!'
    });
  }

  if (order.ShipRegion.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Ship region is required!'
    });
  }

  if (order.ShipPostalCode.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Ship postal code is required!'
    });
  }

  if (order.ShipCountry.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Ship country is required!'
    });
  }

  order.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        statusCode: res.statusCode,
        message:
          err.sqlMessage ||
          'Some error occurred while inserting new order.'
      });
    } else if (data) {
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
      statusCode: res.statusCode,
      message: 'Content can not be empty!'
    });
  }

  if (order.CustomerID.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Customer is required!'
    });
  }

  if (order.EmployeeID.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Employee is required!'
    });
  }

  if (order.OrderDate.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Order date is required!'
    });
  }

  if (order.ShippedDate.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Shipped date is required!'
    });
  }

  if (order.ShipAddress.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Shipp address is required!'
    });
  }

  if (order.ShipCity.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Ship city is required!'
    });
  }

  if (order.ShipRegion.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Ship region is required!'
    });
  }

  if (order.ShipPostalCode.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Ship postal code is required!'
    });
  }

  if (order.ShipCountry.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Ship country is required!'
    });
  }

  order.update(id, req.body, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          statusCode: res.statusCode,
          message: `Not found Order with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Error updating Order with id ${req.params.id}`
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
          statusCode: res.statusCode,
          message: `Not found Order with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Could not delete Order with id ${req.params.id}`
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
