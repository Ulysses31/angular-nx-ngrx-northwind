import * as moment from 'moment';
import sql from '../db';

class Shipper {
  constructor(shipper) {
    if (shipper) {
      this.ShipperID = shipper.ShipperID;
      this.CompanyName = shipper.CompanyName;
      this.Phone = shipper.Phone;
      this.CreatedBy = shipper.CreatedBy;
      this.UpdatedAt = shipper.UpdatedAt;
    }
  }

  browse(result) {
    const query = `
		select
      ShipperID,
      CompanyName,
      Phone
      #CreatedBy,
      #CreatedAt,
      #UpdatedAt
		from shippers
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        throw err;
      }
      // console.log('Shippers: ', res);
      result(null, res);
    });
  }

  load(id, result) {
    const query = `
		select
      ShipperID,
      CompanyName,
      Phone,
      CreatedBy,
      CreatedAt,
      UpdatedAt
		from shippers where ShipperID = ${id}
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        throw err;
      }

      // console.log('Shipper: ', res);

      if (res.length === 0) {
        result({ kind: 'not_found' }, null);
      } else {
        result(null, res);
      }
    });
  }

  create(shipper, result) {
    shipper.CreatedBy = 'admin';
    sql.query('insert into shippers set ?', shipper, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        throw err;
      }
      // console.log('created shipper: ', {
      //   id: res.insertId,
      //   ...shipper
      // });
      result(null, { id: res.insertId, ...shipper });
    });
  }

  update(id, shipper, result) {
    sql.query(
      `update shippers
			 set
        ShipperID = ?,
        CompanyName = ?,
        Phone = ?,
        UpdatedAt = ?
			 where ShipperID = ?`,
      [
        shipper.ShipperID,
        shipper.CompanyName,
        shipper.Phone,
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
          // not found Shipper with the id
          result({ kind: 'not_found' }, null);
          return;
        }
        // console.log('updated shipper: ', {
        //   id: id,
        //   ...shipper
        // });
        result(null, { id: id, ...shipper });
      }
    );
  }

  delete(id, result) {
    sql.query(
      'delete from shippers where ShipperID = ?',
      id,
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          throw err;
        }
        if (res.affectedRows === 0) {
          // not found Shipper with the id
          result({ kind: 'not_found' }, null);
          return;
        }
        // console.log('deleted shipper with id: ', id);
        result(null, res);
      }
    );
  }
}

export default Shipper;
