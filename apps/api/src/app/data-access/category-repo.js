import * as moment from 'moment';
import sql from '../db';

class Category {
  constructor(category) {
    if (category) {
      this.CategoryID = category.CategoryID;
      this.CategoryName = category.CategoryName;
      this.Description = category.Description;
      this.CreatedBy = category.CreatedBy;
      this.UpdatedAt = category.UpdatedAt;
    }
  }

  browse(result) {
    const query = `
		select
      CategoryID,
      CategoryName,
      Description
		from categories
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        throw err;
      }
      // console.log('Categories: ', res);
      result(null, res);
    });
  }

  load(id, result) {
    const query = `
		select
      CategoryID,
      CategoryName,
      Description
		from categories where CategoryID = ${id}
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        throw err;
      }

      // console.log('Category: ', res);

      if (res.length === 0) {
        result({ kind: 'not_found' }, null);
      } else {
        result(null, res);
      }
    });
  }

  create(category, result) {
    sql.query(
      'insert into categories set ?',
      category,
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(err, null);
          throw err;
        }
        // console.log('created category: ', {
        //   id: res.insertId,
        //   ...category
        // });
        result(null, { id: res.insertId, ...category });
      }
    );
  }

  update(id, category, result) {
    sql.query(
      `update categories
			 set
        CategoryID = ?,
        CategoryName = ?,
        Description = ?,
        UpdatedAt = ?
			 where CategoryID = ?`,
      [
        category.CategoryID,
        category.CategoryName,
        category.Description,
        moment(new Date()).format('yyyy-MM-DD HH-mm-ss'),
        id
      ],
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          throw err;
        }
        if (res.affectedRows === 0) {
          // not found Category with the id
          result({ kind: 'not_found' }, null);
          return;
        }
        // console.log('updated category: ', {
        //   id: id,
        //   ...category
        // });
        result(null, { id: id, ...category });
      }
    );
  }

  delete(id, result) {
    sql.query(
      'delete from categories where CategoryID = ?',
      id,
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          throw err;
        }
        if (res.affectedRows === 0) {
          // not found Category with the id
          result({ kind: 'not_found' }, null);
          return;
        }
        // console.log('deleted category with id: ', id);
        result(null, res);
      }
    );
  }
}

export default Category;
