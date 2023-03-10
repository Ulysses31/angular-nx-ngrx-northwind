import * as moment from 'moment';
import sql from '../db';

class Product {
  constructor(product) {
    if (product) {
      this.ProductID = product.ProductID;
      this.ProductName = product.ProductName;
      this.SupplierID = product.SupplierID;
      this.CategoryID = product.CategoryID;
      this.QuantityPerUnit = product.QuantityPerUnit;
      this.UnitPrice = product.UnitPrice;
      this.UnitsInStock = product.UnitsInStock;
      this.UnitsOnOrder = product.UnitsOnOrder;
      this.ReorderLevel = product.ReorderLevel;
      this.Discontinued = product.Discontinued;
      this.CreatedBy = product.CreatedBy;
      this.UpdatedAt = product.UpdatedAt;
    }
  }

  browse(result) {
    const query = `
		select
      p.ProductID,
      p.ProductName,
      #p.SupplierID,
      #(SELECT companyName FROM suppliers s WHERE s.ID = p.SupplierID) AS Supplier,
      #p.CategoryID,
      (SELECT categoryName FROM categories c WHERE c.categoryID = p.CategoryID) AS Category,
      p.QuantityPerUnit,
      p.UnitPrice
      #p.UnitsInStock,
      #p.UnitsOnOrder,
      #p.ReorderLevel,
      #p.Discontinued,
      #case
      #	when p.Discontinued = 1 then 'Yes'
      #	when p.Discontinued = 0 then 'No'
      #end as Discontinued
      #CreatedBy,
      #CreatedAt,
      #UpdatedAt
		from products p
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        throw err;
      }
      // console.log('Products: ', res);
      result(null, res);
    });
  }

  load(id, result) {
    const query = `
		select
      p.ProductID,
      p.ProductName,
      p.SupplierID,
      (SELECT companyName FROM suppliers s WHERE s.ID = p.SupplierID) AS LU_Supplier,
      p.CategoryID,
      (SELECT categoryName FROM categories c WHERE c.categoryID = p.CategoryID) AS LU_Category,
      p.QuantityPerUnit,
      p.UnitPrice,
      p.UnitsInStock,
      p.UnitsOnOrder,
      p.ReorderLevel,
      p.Discontinued,
      p.CreatedBy,
      p.CreatedAt,
      p.UpdatedAt
		from products p where p.ProductID = ${id}
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        throw err;
      }

      // console.log('Product: ', res);

      if (res.length === 0) {
        result({ kind: 'not_found' }, null);
      } else {
        result(null, res);
      }
    });
  }

  create(product, result) {
    product.CreatedBy = 'admin';
    sql.query('insert into products set ?', product, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        throw err;
      }
      // console.log('created product: ', {
      //   id: res.insertId,
      //   ...product
      // });
      result(null, { id: res.insertId, ...product });
    });
  }

  update(id, product, result) {
    sql.query(
      `update products
			 set
        ProductID = ?,
        ProductName = ?,
        SupplierID = ?,
        CategoryID = ?,
        QuantityPerUnit = ?,
        UnitPrice = ?,
        UnitsInStock = ?,
        UnitsOnOrder = ?,
        ReorderLevel = ?,
        Discontinued = ?,
        UpdatedAt = ?
			 where ProductID = ?`,
      [
        product.ProductID,
        product.ProductName,
        product.SupplierID,
        product.CategoryID,
        product.QuantityPerUnit,
        product.UnitPrice,
        product.UnitsInStock,
        product.UnitsOnOrder,
        product.ReorderLevel,
        product.Discontinued,
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
          // not found Product with the id
          result({ kind: 'not_found' }, null);
          return;
        }
        // console.log('updated product: ', {
        //   id: id,
        //   ...product
        // });
        result(null, { id: id, ...product });
      }
    );
  }

  delete(id, result) {
    sql.query(
      'delete from products where ProductID = ?',
      id,
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          throw err;
        }
        if (res.affectedRows === 0) {
          // not found Product with the id
          result({ kind: 'not_found' }, null);
          return;
        }
        // console.log('deleted product with id: ', id);
        result(null, res);
      }
    );
  }
}

export default Product;
