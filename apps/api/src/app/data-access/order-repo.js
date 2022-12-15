import * as moment from 'moment';
import sql from '../db';

class Order {
  constructor(order) {
    if (order) {
      this.OrderID = order.OrderID;
      this.CustomerID = order.CustomerID;
      this.EmployeeID = order.EmployeeID;
      this.OrderDate = order.OrderDate;
      this.RequiredDate = order.RequiredDate;
      this.ShippedDate = order.ShippedDate;
      this.ShipVia = order.ShipVia;
      this.Freight = order.Freight;
      this.ShipName = order.ShipName;
      this.ShipAddress = order.ShipAddress;
      this.ShipCity = order.ShipCity;
      this.ShipRegion = order.ShipRegion;
      this.ShipPostalCode = order.ShipPostalCode;
      this.ShipCountry = order.ShipCountry;
      this.CreatedBy = order.CreatedBy;
      this.UpdatedAt = order.UpdatedAt;
    }
  }

  browse(result) {
    const query = `
		select
      OrderID,
      CustomerID,
      EmployeeID,
      OrderDate,
      RequiredDate,
      ShippedDate,
      ShipVia,
      Freight,
      ShipName,
      ShipAddress,
      ShipCity,
      ShipRegion,
      ShipPostalCode,
      ShipCountry
		from orders
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        throw err;
      }
      // console.log('Orders: ', res);
      result(null, res);
    });
  }

  load(id, result) {
    const query = `
		select
      OrderID,
      CustomerID,
      EmployeeID,
      OrderDate,
      RequiredDate,
      ShippedDate,
      ShipVia,
      Freight,
      ShipName,
      ShipAddress,
      ShipCity,
      ShipRegion,
      ShipPostalCode,
      ShipCountry
		from orders where OrderID = ${id}
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        throw err;
      }

      // console.log('Order: ', res);

      if (res.length === 0) {
        result({ kind: 'not_found' }, null);
      } else {
        result(null, res);
      }
    });
  }

  create(order, result) {
    order.OrderDate = moment(order.OrderDate).format('yyyy-MM-DD');
    order.RequiredDate = moment(order.RequiredDate).format('yyyy-MM-DD');
    order.ShippedDate = moment(order.ShippedDate).format('yyyy-MM-DD');

    sql.query('insert into orders set ?', order, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        throw err;
      }
      // console.log('created order: ', {
      //   id: res.insertId,
      //   ...order
      // });
      result(null, { id: res.insertId, ...order });
    });
  }

  update(id, order, result) {
    order.OrderDate = moment(order.OrderDate).format('yyyy-MM-DD');
    order.RequiredDate = moment(order.RequiredDate).format('yyyy-MM-DD');
    order.ShippedDate = moment(order.ShippedDate).format('yyyy-MM-DD');

    sql.query(
      `update orders
			 set
        OrderID = ?,
        CustomerID = ?,
        EmployeeID = ?,
        OrderDate = ?,
        RequiredDate = ?,
        ShippedDate = ?,
        ShipVia = ?,
        Freight = ?,
        ShipName = ?,
        ShipAddress = ?,
        ShipCity = ?,
        ShipRegion = ?,
        ShipPostalCode = ?,
        ShipCountry = ?,
        UpdatedAt = ?
			 where OrderID = ?`,
      [
        order.OrderID,
        order.CustomerID,
        order.EmployeeID,
        order.OrderDate,
        order.RequiredDate,
        order.ShippedDate,
        order.ShipVia,
        order.Freight,
        order.ShipName,
        order.ShipAddress,
        order.ShipCity,
        order.ShipRegion,
        order.ShipPostalCode,
        order.ShipCountry,
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
          // not found Order with the id
          result({ kind: 'not_found' }, null);
          return;
        }
        // console.log('updated order: ', {
        //   id: id,
        //   ...order
        // });
        result(null, { id: id, ...order });
      }
    );
  }

  delete(id, result) {
    sql.query(
      'delete from orders where OrderID = ?',
      id,
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          throw err;
        }
        if (res.affectedRows === 0) {
          // not found Order with the id
          result({ kind: 'not_found' }, null);
          return;
        }
        // console.log('deleted order with id: ', id);
        result(null, res);
      }
    );
  }
}

export default Order;
