import Category from '../data-access/category-repo';
import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
  var category = new Category();
  category.browse((err, data) => {
    if (err) {
      return res.status(500).send({
        statusCode: res.statusCode,
        message:
          err.sqlMessage ||
          'Some error occurred while retrieving categories.'
      });
    }
    return res.send({
      categories: data,
      statusCode: res.statusCode,
      error: ''
    });
  });
});

router.get('/:id', async (req, res) => {
  var category = new Category(this);
  var id = req.params.id;
  category.load(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        return res.status(404).send({
          statusCode: res.statusCode,
          message: `Not found Category with id ${req.params.id}.`
        });
      } else {
        return res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Error retrieving Category with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        categories: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.post('/', async (req, res) => {
  var category = new Category(req.body);

  if (!req.body) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Content can not be empty!'
    });
  }

  if (category.CategoryName.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'CategoryName is required!'
    });
  }

  category.create(req.body, (err, data) => {
    if (err) {
      return res.status(500).send({
        statusCode: res.statusCode,
        message:
          err.sqlMessage ||
          'Some error occurred while inserting new category.'
      });
    } else if (data) {
      return res.send({
        category: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.put('/:id', async (req, res) => {
  var id = req.params.id;
  var category = new Category(req.body);

  if (!req.body) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'Content can not be empty!'
    });
  }

  if (category.CategoryName.length === 0) {
    return res.status(400).send({
      statusCode: res.statusCode,
      message: 'CategoryName is required!'
    });
  }

  category.update(id, req.body, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        return res.status(404).send({
          statusCode: res.statusCode,
          message: `Not found Category with id ${req.params.id}.`
        });
      } else {
        return res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Error updating Category with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        category: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

router.delete('/:id', async (req, res) => {
  var id = req.params.id;
  var category = new Category(this);

  category.delete(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        return res.status(404).send({
          statusCode: res.statusCode,
          message: `Not found Category with id ${req.params.id}.`
        });
      } else {
        return res.status(500).send({
          statusCode: res.statusCode,
          message:
            err.sqlMessage ||
            `Could not delete Category with id ${req.params.id}`
        });
      }
    } else {
      return res.send({
        category: data,
        statusCode: res.statusCode,
        error: ''
      });
    }
  });
});

export default router;
