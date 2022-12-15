import Region from '../data-access/region-repo';
import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
  var region = new Region();
  region.browse((err, data) => {
    if (err) {
      res.status(500).send({
        regions: [],
        statusCode: res.statusCode,
        error:
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
          regions: [],
          statusCode: res.statusCode,
          error: `Not found Region with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          regions: [],
          statusCode: res.statusCode,
          error: `Error retrieving Region with id ${req.params.id}`
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

  region.create(region, (err, data) => {
    if (err) {
      res.status(500).send({
        regions: [],
        statusCode: res.statusCode,
        error:
          err.message ||
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
  var region = new Region(this);

  if (!req.body) {
    res.status(400).send({
      region: {},
      statusCode: res.statusCode,
      error: 'Content can not be empty!'
    });
  }

  region.update(id, req.body, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          region: {},
          statusCode: res.statusCode,
          error: `Not found Region with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          region: {},
          statusCode: res.statusCode,
          error: `Error updating Region with id ${req.params.id}`
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
          region: {},
          statusCode: res.statusCode,
          error: `Not found Region with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          region: {},
          statusCode: res.statusCode,
          error: `Could not delete Region with id ${req.params.id}`
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
