import { Router } from 'express';
import Shipper from '../data-access/shipper-repo';
const router = Router();

router.get('/', async (req, res) => {
  var shipper = new Shipper();
  shipper.browse((err, data) => {
    if (err) {
      res.status(500).send({
        statusCode: res.statusCode,
        message:
          err.sqlMessage ||
          'Some error occurred while retrieving shippers.'
      });
    }
    return res.send({
      shippers: data,
      statusCode: res.statusCode,
      error: ''
    });
  });
});

router.get('/:id', async (req, res) => {
  var shipper = new Shipper(this);
  var id = req.params.id;
  shipper.load(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          statusCode: res.statusCode,
          message: `Not found Shipper with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Error retrieving Shipper with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        shippers: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.post('/', async (req, res) => {
  var shipper = new Shipper(req.body);

  if (!req.body) {
    res.status(400).send({
      statusCode: res.statusCode,
      message: 'Content can not be empty!'
    });
  }

  if (shipper.CompanyName.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'CompanyName is required!'
    });
  }

  shipper.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        statusCode: res.statusCode,
        message:
          err.sqlMessage ||
          'Some error occurred while inserting new shipper.'
      });
    } else {
      return res.send({
        shipper: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.put('/:id', async (req, res) => {
  var id = req.params.id;
  var shipper = new Shipper(req.body);

  if (!req.body) {
    res.status(400).send({
      statusCode: res.statusCode,
      message: 'Content can not be empty!'
    });
  }

  if (shipper.CompanyName.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'CompanyName is required!'
    });
  }

  shipper.update(id, req.body, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          statusCode: res.statusCode,
          message: `Not found Shipper with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Error updating Shipper with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        shipper: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.delete('/:id', async (req, res) => {
  var id = req.params.id;
  var shipper = new Shipper(this);
  shipper.delete(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          statusCode: res.statusCode,
          message: `Not found Shipper with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Could not delete Shipper with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        shipper: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

export default router;
