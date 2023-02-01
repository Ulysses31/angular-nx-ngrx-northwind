import { Router } from 'express';
import EmployeeTerritory from '../data-access/employee-territory-repo';
const router = Router();

router.get('/', async (req, res) => {
  var employeeTerritory = new EmployeeTerritory();
  employeeTerritory.browse((err, data) => {
    if (err) {
      res.status(500).send({
        statusCode: res.statusCode,
        message:
          err.sqlMessage ||
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
          statusCode: res.statusCode,
          message: `Not found EmployeeTerritory with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Error retrieving EmployeeTerritory with id ${req.params.id}`
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
      statusCode: res.statusCode,
      error: 'Content can not be empty!'
    });
  }

  if (employeeTerritory.EmployeeID.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Employee ID is required!'
    });
  }

  if (employeeTerritory.TerritoryID.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Territory ID is required!'
    });
  }

  employeeTerritory.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        statusCode: res.statusCode,
        message:
          err.sqlMessage ||
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
  var employeeTerritory = new EmployeeTerritory(req.body);

  if (!req.body) {
    res.status(400).send({
      statusCode: res.statusCode,
      message: 'Content can not be empty!'
    });
  }

  if (employeeTerritory.EmployeeID.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Employee ID is required!'
    });
  }

  if (employeeTerritory.TerritoryID.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Territory ID is required!'
    });
  }

  employeeTerritory.update(id, req.body, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          statusCode: res.statusCode,
          message: `Not found EmployeeTerritory with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Error updating EmployeeTerritory with id ${req.params.id}`
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
        res.status(404).send({
          statusCode: res.statusCode,
          message: `Not found EmployeeTerritory with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          employeeTerritory: {},
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Could not delete EmployeeTerritory with id ${req.params.id}`
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
