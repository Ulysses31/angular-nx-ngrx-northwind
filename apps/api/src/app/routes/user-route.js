import User from '../data-access/user-repo';
import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
  var user = new User();
  user.browse((err, data) => {
    if (err) {
      res.status(500).send({
        users: [],
        statusCode: res.statusCode,
        error:
          err.message || 'Some error occurred while retrieving users.'
      });
    }
    return res.send({
      users: data,
      statusCode: res.statusCode,
      error: ''
    });
  });
});

router.get('/:id', async (req, res) => {
  var user = new User(this);
  var id = req.params.id;
  user.load(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          users: [],
          statusCode: res.statusCode,
          error: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          users: [],
          statusCode: res.statusCode,
          error: `Error retrieving User with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        users: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.post('/', async (req, res) => {
  var user = new User(req.body);

  if (!req.body) {
    res.status(400).send({
      user: {},
      statusCode: res.statusCode,
      error: 'Content can not be empty!'
    });
  }

  user.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        user: {},
        statusCode: res.statusCode,
        error:
          err.message ||
          'Some error occurred while inserting new user.'
      });
    } else {
      return res.send({
        user: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.put('/:id', async (req, res) => {
  var id = req.params.id;
  var user = new User(this);

  if (!req.body) {
    res.status(400).send({
      user: {},
      statusCode: res.statusCode,
      error: 'Content can not be empty!'
    });
  }

  user.update(id, req.body, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          user: {},
          statusCode: res.statusCode,
          error: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          user: {},
          statusCode: res.statusCode,
          error: `Error updating User with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        user: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.delete('/:id', async (req, res) => {
  var id = req.params.id;
  var user = new User(this);
  user.delete(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          user: {},
          statusCode: res.statusCode,
          error: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          user: {},
          statusCode: res.statusCode,
          error: `Could not delete User with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        user: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

export default router;
