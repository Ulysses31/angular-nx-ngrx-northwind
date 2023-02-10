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
      #CreatedBy,
      #CreatedAt,
      #UpdatedAt
		from categories
	`;
    sql.query(query, (err, res) => {
      if (err) {
        result({ ...err }, null);
        return { ...err };
      }

      result(null, res);
      return res;
    });
  }

  load(id, result) {
    const query = `
		select
      CategoryID,
      CategoryName,
      Description,
      CreatedBy,
      CreatedAt,
      UpdatedAt
		from categories where CategoryID = ${id}
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result({ ...err }, null);
        return { ...err };
      }

      if (res.length === 0) {
        result({ kind: 'not_found' }, null);
        return { kind: 'not_found' };
      } else {
        result(null, res);
        return res;
      }
    });
  }

  create(category, result) {
    category.CreatedBy = 'admin';
    sql.query('insert into categories set ?', category, (err) => {
      if (err) {
        result({ ...err }, null);
        return { ...err };
      }
      // console.log('created category: ', {
      //   id: res.insertId,
      //   ...category
      // });

      result(null, { ...category });
      return { ...category };
    });
  }

  update(id, category, result) {
    sql.query(
      `update categories
			 set
        CategoryName = ?,
        Description = ?,
        UpdatedAt = ?
			 where CategoryID = ?`,
      [
        category.CategoryName,
        category.Description,
        moment(new Date()).format('yyyy-MM-DD HH-mm-ss'),
        id
      ],
      (err, res) => {
        if (err) {
          result({ ...err }, null);
          return { ...err };
        }
        if (res.affectedRows === 0) {
          // not found Category with the id
          result({ kind: 'not_found' }, null);
          return { kind: 'not_found' };
        }
        // console.log('updated category: ', {
        //   id: id,
        //   ...category
        // });
        result(null, { ...category });
        return { ...category };
      }
    );
  }

  delete(id, result) {
    sql.query(
      'delete from categories where CategoryID = ?',
      id,
      (err, res) => {
        if (err) {
          result({ ...err }, null);
          return { ...err };
        }
        if (res.affectedRows === 0) {
          // not found Category with the id
          result({ kind: 'not_found' }, null);
          return { kind: 'not_found' };
        }
        // console.log('deleted category with id: ', id);
        result(null, res);
        return res;
      }
    );
  }
}

export default Category;
