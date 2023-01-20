import Employee from '../data-access/employee-repo';
import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
  var employee = new Employee();
  employee.browse((err, data) => {
    if (err) {
      res.status(500).send({
        employees: [],
        statusCode: res.statusCode,
        error:
          err.message ||
          'Some error occurred while retrieving employees.'
      });
    }
    return res.send({
      employees: data,
      statusCode: res.statusCode,
      error: ''
    });
  });
});

router.get('/:id', async (req, res) => {
  var employee = new Employee(this);
  var id = req.params.id;
  employee.load(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          employees: [],
          statusCode: res.statusCode,
          error: `Not found Employee with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          employees: [],
          statusCode: res.statusCode,
          error: `Error retrieving Employee with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        employees: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.post('/', async (req, res) => {
  var employee = new Employee(req.body);

  if (!req.body) {
    res.status(400).send({
      employee: {},
      statusCode: res.statusCode,
      error: 'Content can not be empty!'
    });
  }

  employee.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        employee: {},
        statusCode: res.statusCode,
        error:
          err.message ||
          'Some error occurred while inserting new employee.'
      });
    } else {
      return res.send({
        employee: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.put('/:id', async (req, res) => {
  var id = req.params.id;
  var employee = new Employee(this);

  if (!req.body) {
    res.status(400).send({
      employee: {},
      statusCode: res.statusCode,
      error: 'Content can not be empty!'
    });
  }

  employee.update(id, req.body, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          employee: {},
          statusCode: res.statusCode,
          error: `Not found Employee with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          employee: {},
          statusCode: res.statusCode,
          error: `Error updating Employee with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        employee: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.delete('/:id', async (req, res) => {
  var id = req.params.id;
  var employee = new Employee(this);
  employee.delete(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res
          .status(404)
          .send({
            employee: {},
            statusCode: res.statusCode,
            error: `Not found Employee with id ${req.params.id}.`
          });
      } else {
        res
          .status(500)
          .send({
            employee: {},
            statusCode: res.statusCode,
            error: `Could not delete Employee with id ${req.params.id}`
          });
      }
    } else {
      return res.send({
        employee: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

export default router;
