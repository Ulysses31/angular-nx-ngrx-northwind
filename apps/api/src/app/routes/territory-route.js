import Territory from '../data-access/territory-repo';
import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
  var territory = new Territory();
  territory.browse((err, data) => {
    if (err) {
      res.status(500).send({
        statusCode: res.statusCode,
        message:
          err.sqlMessage ||
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
          statusCode: res.statusCode,
          message: `Not found Territory with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          mesage:
            err.sqlMessage ||
            `Error retrieving Territory with id ${req.params.id}`
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

  if (territory.TerritoryID.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'TerritoryID is required!'
    });
  }

  if (territory.TerritoryDescription.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'TerritoryDescription is required!'
    });
  }

  if (territory.RegionID.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'RegionID is required!'
    });
  }

  territory.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        statusCode: res.statusCode,
        message:
          err.sqlMessage ||
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
  var territory = new Territory(req.body);

  if (!req.body) {
    res.status(400).send({
      territory: {},
      statusCode: res.statusCode,
      error: 'Content can not be empty!'
    });
  }

  if (territory.TerritoryID.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'TerritoryID is required!'
    });
  }

  if (territory.TerritoryDescription.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'TerritoryDescription is required!'
    });
  }

  if (territory.RegionID.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'RegionID is required!'
    });
  }

  territory.update(id, req.body, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          statusCode: res.statusCode,
          message: `Not found Territory with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Error updating Territory with id ${req.params.id}`
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
          statusCode: res.statusCode,
          message: `Not found Territory with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Could not delete Territory with id ${req.params.id}`
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
