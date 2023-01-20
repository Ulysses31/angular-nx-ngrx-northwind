import * as moment from 'moment';
import sql from '../db';

class Supplier {
  constructor(supplier) {
    if (supplier) {
      this.Id = supplier.Id;
      this.CompanyName = supplier.CompanyName;
      this.ContactName = supplier.ContactName;
      this.ContactTitle = supplier.ContactTitle;
      this.Address = supplier.Address;
      this.City = supplier.City;
      this.Region = supplier.Region;
      this.PostalCode = supplier.PostalCode;
      this.Country = supplier.Country;
      this.Phone = supplier.Phone;
      this.Fax = supplier.Fax;
      this.HomePage = supplier.HomePage;
      this.CreatedBy = supplier.CreatedBy;
      this.UpdatedAt = supplier.UpdatedAt;
    }
  }

  browse(result) {
    const query = `
		select
      Id,
      CompanyName,
      ContactName,
      ContactTitle,
      Address,
      City,
      Region,
      PostalCode,
      Country,
      Phone,
      Fax,
      HomePage,
      CreatedBy,
      CreatedAt,
      UpdatedAt
		from suppliers
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        throw err;
      }
      // console.log('Suppliers: ', res);
      result(null, res);
    });
  }

  load(id, result) {
    const query = `
		select
      Id,
      CompanyName,
      ContactName,
      ContactTitle,
      Address,
      City,
      Region,
      PostalCode,
      Country,
      Phone,
      Fax,
      HomePage,
      CreatedBy,
      CreatedAt,
      UpdatedAt
		from suppliers where Id = ${id}
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        throw err;
      }

      // console.log('Supplier: ', res);

      if (res.length === 0) {
        result({ kind: 'not_found' }, null);
      } else {
        result(null, res);
      }
    });
  }

  create(supplier, result) {
    sql.query('insert into suppliers set ?', supplier, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        throw err;
      }
      // console.log('created supplier: ', {
      //   id: res.insertId,
      //   ...supplier
      // });
      result(null, { id: res.insertId, ...supplier });
    });
  }

  update(id, supplier, result) {
    sql.query(
      `update suppliers
			 set
        Id = ?,
        CompanyName = ?,
        ContactName = ?,
        ContactTitle = ?,
        Address = ?,
        City = ?,
        Region = ?,
        PostalCode = ?,
        Country = ?,
        Phone = ?,
        Fax = ?,
        HomePage = ?,
        UpdatedAt = ?
			 where Id = ?`,
      [
        supplier.Id,
        supplier.CompanyName,
        supplier.ContactName,
        supplier.ContactTitle,
        supplier.Address,
        supplier.City,
        supplier.Region,
        supplier.PostalCode,
        supplier.Country,
        supplier.Phone,
        supplier.Fax,
        supplier.HomePage,
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
          // not found Supplier with the id
          result({ kind: 'not_found' }, null);
          return;
        }
        // console.log('updated supplier: ', {
        //   id: id,
        //   ...supplier
        // });
        result(null, { id: id, ...supplier });
      }
    );
  }

  delete(id, result) {
    sql.query(
      'delete from suppliers where Id = ?',
      id,
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          throw err;
        }
        if (res.affectedRows === 0) {
          // not found Supplier with the id
          result({ kind: 'not_found' }, null);
          return;
        }
        // console.log('deleted supplier with id: ', id);
        result(null, res);
      }
    );
  }
}

export default Supplier;
