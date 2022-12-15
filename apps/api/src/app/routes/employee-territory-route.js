import EmployeeTerritory from '../data-access/employee-territory-repo';
import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
  var employeeTerritory = new EmployeeTerritory();
  employeeTerritory.browse((err, data) => {
    if (err) {
      res.status(500).send({
        employeeTerritories: [],
        statusCode: res.statusCode,
        error:
          err.message ||
          'Some error occurred while retrieving employeeTerritories.'
      });
    }
    return res.send({
      employeeTerritories: data,
      statusCode: res.statusCode,
      error: ''
    });
  });
});

router.get('/:id', async (req, res) => {
  var employeeTerritory = new EmployeeTerritory(this);
  var id = req.params.id;
  employeeTerritory.load(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          employeeTerritories: [],
          statusCode: res.statusCode,
          error: `Not found EmployeeTerritory with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          employeeTerritories: [],
          statusCode: res.statusCode,
          error: `Error retrieving EmployeeTerritory with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        employeeTerritories: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.post('/', async (req, res) => {
  var employeeTerritory = new EmployeeTerritory(req.body);

  if (!req.body) {
    res.status(400).send({
      employeeTerritory: {},
      statusCode: res.statusCode,
      error: 'Content can not be empty!'
    });
  }

  employeeTerritory.create(employeeTerritory, (err, data) => {
    if (err) {
      res.status(500).send({
        employeeTerritories: [],
        statusCode: res.statusCode,
        error:
          err.message ||
          'Some error occurred while inserting new employeeTerritory.'
      });
    } else {
      return res.send({
        employeeTerritory: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.put('/:id', async (req, res) => {
  var id = req.params.id;
  var employeeTerritory = new EmployeeTerritory(this);

  if (!req.body) {
    res.status(400).send({
      employeeTerritory: {},
      statusCode: res.statusCode,
      error: 'Content can not be empty!'
    });
  }

  employeeTerritory.update(id, req.body, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          employeeTerritory: {},
          statusCode: res.statusCode,
          error: `Not found EmployeeTerritory with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          employeeTerritory: {},
          statusCode: res.statusCode,
          error: `Error updating EmployeeTerritory with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        employeeTerritory: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.delete('/:id', async (req, res) => {
  var id = req.params.id;
  var employeeTerritory = new EmployeeTerritory(this);
  employeeTerritory.delete(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res
          .status(404)
          .send({
            employeeTerritory: {},
            statusCode: res.statusCode,
            error: `Not found EmployeeTerritory with id ${req.params.id}.`
          });
      } else {
        res
          .status(500)
          .send({
            employeeTerritory: {},
            statusCode: res.statusCode,
            error: `Could not delete EmployeeTerritory with id ${req.params.id}`
          });
      }
    } else {
      return res.send({
        employeeTerritory: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

export default router;
