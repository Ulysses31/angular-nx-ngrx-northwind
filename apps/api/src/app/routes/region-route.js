import { Router } from 'express';
import Region from '../data-access/region-repo';
const router = Router();

router.get('/', async (req, res) => {
  var region = new Region();
  region.browse((err, data) => {
    if (err) {
      res.status(500).send({
        statusCode: res.statusCode,
        message:
          err.message ||
          'Some error occurred while retrieving regions.'
      });
    }
    return res.send({
      regions: data,
      statusCode: res.statusCode,
      error: ''
    });
  });
});

router.get('/:id', async (req, res) => {
  var region = new Region(this);
  var id = req.params.id;
  region.load(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          statusCode: res.statusCode,
          message: `Not found Region with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Error retrieving Region with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        regions: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.post('/', async (req, res) => {
  var region = new Region(req.body);

  if (!req.body) {
    res.status(400).send({
      region: {},
      statusCode: res.statusCode,
      error: 'Content can not be empty!'
    });
  }

  if (region.RegionDescription.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'RegionDescription is required!'
    });
  }

  region.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        statusCode: res.statusCode,
        error:
          err.sqlMessage ||
          'Some error occurred while inserting new region.'
      });
    } else {
      return res.send({
        region: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.put('/:id', async (req, res) => {
  var id = req.params.id;
  var region = new Region(req.body);

  if (!req.body) {
    res.status(400).send({
      statusCode: res.statusCode,
      message: 'Content can not be empty!'
    });
  }

  if (region.RegionDescription.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'RegionDescription is required!'
    });
  }

  region.update(id, req.body, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          statusCode: res.statusCode,
          message: `Not found Region with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Error updating Region with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        region: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.delete('/:id', async (req, res) => {
  var id = req.params.id;
  var region = new Region(this);
  region.delete(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          statusCode: res.statusCode,
          message: `Not found Region with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Could not delete Region with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        region: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

export default router;
