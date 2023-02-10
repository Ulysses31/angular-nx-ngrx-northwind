import * as moment from 'moment';
import sql from '../db';

class Customer {
  constructor(customer) {
    if (customer) {
      this.CustomerID = customer.CustomerID;
      this.CompanyName = customer.CompanyName;
      this.ContactName = customer.ContactName;
      this.ContactTitle = customer.ContactTitle;
      this.Address = customer.Address;
      this.City = customer.City;
      this.Region = customer.Region;
      this.PostalCode = customer.PostalCode;
      this.Country = customer.Country;
      this.Phone = customer.Phone;
      this.Fax = customer.Fax;
      this.CreatedBy = customer.CreatedBy;
      this.UpdatedAt = customer.UpdatedAt;
    }
  }

  browse(result) {
    const query = `
		select
      CustomerID,
      CompanyName,
      ContactName,
      ContactTitle,
      Address,
      City,
      Region,
      PostalCode,
      Country,
      Phone,
      Fax
      #CreatedBy,
      #CreatedAt,
      #UpdatedAt
		from customers
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        throw err;
      }
      // console.log('Customers: ', res);
      result(null, res);
    });
  }

  load(id, result) {
    const query = `
		select
      CustomerID,
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
      CreatedBy,
      CreatedAt,
      UpdatedAt
		from customers where CustomerID = '${id}'
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        throw err;
      }

      // console.log('Customer: ', res);

      if (res.length === 0) {
        result({ kind: 'not_found' }, null);
      } else {
        result(null, res);
      }
    });
  }

  create(customer, result) {
    customer.CreatedBy = 'admin';
    sql.query('insert into customers set ?', customer, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        throw err;
      }
      // console.log('created customer: ', {
      //   id: res.insertId,
      //   ...customer
      // });
      result(null, { id: res.insertId, ...customer });
    });
  }

  update(id, customer, result) {
    sql.query(
      `update customers
			 set
        CustomerID = ?,
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
        UpdatedAt = ?
			 where CustomerID = ?`,
      [
        customer.CustomerID,
        customer.CompanyName,
        customer.ContactName,
        customer.ContactTitle,
        customer.Address,
        customer.City,
        customer.Region,
        customer.PostalCode,
        customer.Country,
        customer.Phone,
        customer.Fax,
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
          // not found Customer with the id
          result({ kind: 'not_found' }, null);
          return;
        }
        // console.log('updated customer: ', {
        //   id: id,
        //   ...customer
        // });
        result(null, { id: id, ...customer });
      }
    );
  }

  delete(id, result) {
    sql.query(
      `delete from customers where CustomerID = ?`,
      id,
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          throw err;
        }
        if (res.affectedRows === 0) {
          // not found Customer with the id
          result({ kind: 'not_found' }, null);
          return;
        }
        // console.log('deleted customer with id: ', id);
        result(null, res);
      }
    );
  }
}

export default Customer;
