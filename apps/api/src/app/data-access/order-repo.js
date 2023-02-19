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
      o.OrderID,
      #o.CustomerID,
      (select companyName from customers c where c.customerID = o.customerID) as Customer,
      #o.EmployeeID,
      (select concat(lastname, ' ', firstname) from employees e where e.employeeID = o.employeeID) as Employee,
      o.OrderDate,
      o.RequiredDate,
      o.ShippedDate,
      #o.ShipVia,
      (select companyName from shippers s where s.shipperID = o.shipvia) as Shipper,
      #o.Freight,
      o.ShipName
      #o.ShipAddress,
      #o.ShipCity,
      #o.ShipRegion,
      #o.ShipPostalCode,
      #o.ShipCountry
      #CreatedBy,
      #CreatedAt,
      #UpdatedAt
		from orders o
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
      ShipCountry,
      CreatedBy,
      CreatedAt,
      UpdatedAt
		from orders where OrderID = ${id}
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

  create(order, result) {
    order.CreatedBy = 'admin';
    order.OrderDate = moment(order.OrderDate).format('yyyy-MM-DD');
    order.RequiredDate = moment(order.RequiredDate).format(
      'yyyy-MM-DD'
    );
    order.ShippedDate = moment(order.ShippedDate).format(
      'yyyy-MM-DD'
    );

    const sqlQuery = `
      #SELECT @od := (
      #  SELECT
      #    o2.orderid + 1
      #  FROM orders o2
      #  GROUP BY o2.orderid
      #  ORDER BY o2.orderid DESC
      #  LIMIT 1
      #);

      INSERT INTO orders
      SET
        OrderID = (
          SELECT
            o2.orderid + 1
          FROM orders o2
          GROUP BY o2.orderid
          ORDER BY o2.orderid DESC
          LIMIT 1
        ),
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
        CreatedBy = ?
    `;

    sql.query(
      sqlQuery,
      [
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
        order.CreatedBy
      ],
      (err) => {
        if (err) {
          result({ ...err }, null);
          return { ...err };
        }
        // console.log('created category: ', {
        //   id: res.insertId,
        //   ...category
        // });

        result(null, { ...order });
        return { ...order };
      }
    );
  }

  update(id, order, result) {
    order.OrderDate = moment(order.OrderDate).format('yyyy-MM-DD');
    order.RequiredDate = moment(order.RequiredDate).format(
      'yyyy-MM-DD'
    );
    order.ShippedDate = moment(order.ShippedDate).format(
      'yyyy-MM-DD'
    );

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
        order.ShipName.replace("'", ''),
        order.ShipAddress.replace("'", ''),
        order.ShipCity.replace("'", ''),
        order.ShipRegion.replace("'", ''),
        order.ShipPostalCode,
        order.ShipCountry,
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
        // console.log('updated order: ', {
        //   id: id,
        //   ...order
        // });
        result(null, { ...order });
        return { ...order };
      }
    );
  }

  delete(id, result) {
    sql.query(
      'delete from orders where OrderID = ?',
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

export default Order;
