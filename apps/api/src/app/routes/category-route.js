import Category from '../data-access/category-repo';
import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
  var category = new Category();
  category.browse((err, data) => {
    if (err) {
      res.status(500).send({
        categories: [],
        statusCode: res.statusCode,
        error:
          err.message ||
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
        res.status(404).send({
          categories: [],
          statusCode: res.statusCode,
          error: `Not found Category with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          categories: [],
          statusCode: res.statusCode,
          error: `Error retrieving Category with id ${req.params.id}`
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
    res.status(400).send({
      category: {},
      statusCode: res.statusCode,
      error: 'Content can not be empty!'
    });
  }

  category.create(category, (err, data) => {
    if (err) {
      res.status(500).send({
        categories: [],
        statusCode: res.statusCode,
        error:
          err.message ||
          'Some error occurred while inserting new category.'
      });
    } else {
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
  var category = new Category(this);

  if (!req.body) {
    res.status(400).send({
      category: {},
      statusCode: res.statusCode,
      error: 'Content can not be empty!'
    });
  }

  category.update(id, req.body, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          category: {},
          statusCode: res.statusCode,
          error: `Not found Category with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          category: {},
          statusCode: res.statusCode,
          error: `Error updating Category with id ${req.params.id}`
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
        res
          .status(404)
          .send({
            category: {},
            statusCode: res.statusCode,
            error: `Not found Category with id ${req.params.id}.`
          });
      } else {
        res
          .status(500)
          .send({
            category: {},
            statusCode: res.statusCode,
            error: `Could not delete Category with id ${req.params.id}`
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
