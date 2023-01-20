import Territory from '../data-access/territory-repo';
import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
  var territory = new Territory();
  territory.browse((err, data) => {
    if (err) {
      res.status(500).send({
        territories: [],
        statusCode: res.statusCode,
        error:
          err.message ||
          'Some error occurred while retrieving territories.'
      });
    }
    return res.send({
      territories: data,
      statusCode: res.statusCode,
      error: ''
    });
  });
});

router.get('/:id', async (req, res) => {
  var territory = new Territory(this);
  var id = req.params.id;
  territory.load(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          territories: [],
          statusCode: res.statusCode,
          error: `Not found Territory with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          territories: [],
          statusCode: res.statusCode,
          error: `Error retrieving Territory with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        territories: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.post('/', async (req, res) => {
  var territory = new Territory(req.body);

  if (!req.body) {
    res.status(400).send({
      territory: {},
      statusCode: res.statusCode,
      error: 'Content can not be empty!'
    });
  }

  territory.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        territory: {},
        statusCode: res.statusCode,
        error:
          err.message ||
          'Some error occurred while inserting new territory.'
      });
    } else {
      return res.send({
        territory: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.put('/:id', async (req, res) => {
  var id = req.params.id;
  var territory = new Territory(this);

  if (!req.body) {
    res.status(400).send({
      territory: {},
      statusCode: res.statusCode,
      error: 'Content can not be empty!'
    });
  }

  territory.update(id, req.body, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          territory: {},
          statusCode: res.statusCode,
          error: `Not found Territory with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          territory: {},
          statusCode: res.statusCode,
          error: `Error updating Territory with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        territory: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.delete('/:id', async (req, res) => {
  var id = req.params.id;
  var territory = new Territory(this);
  territory.delete(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          territory: {},
          statusCode: res.statusCode,
          error: `Not found Territory with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          territory: {},
          statusCode: res.statusCode,
          error: `Could not delete Territory with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        territory: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

export default router;
