import * as moment from 'moment';
import sql from '../db';

class OrderDetail {
  constructor(orderDetail) {
    if (orderDetail) {
      this.Id = orderDetail.Id;
      this.OrderID = orderDetail.OrderID;
      this.ProductID = orderDetail.ProductID;
      this.UnitPrice = orderDetail.UnitPrice;
      this.Quantity = orderDetail.Quantity;
      this.Discount = orderDetail.Discount;
      this.CreatedBy = orderDetail.CreatedBy;
      this.UpdatedAt = orderDetail.UpdatedAt;
    }
  }

  browse(result) {
    const query = `
		select
      od.Id,
      od.OrderID,
      #od.ProductID,
      (select productName from products p where p.productID = od.productID) as Product,
      CONCAT(CAST(od.UnitPrice AS DECIMAL(19, 2)), ' €') as UnitPrice,
      od.Quantity,
      CAST(CAST(od.Discount AS DECIMAL(19, 2)) AS VARCHAR(1000)) AS Discount,
      CONCAT(CAST((UnitPrice * Quantity) AS DECIMAL(19, 2)), ' €') AS SubTotal,
      CONCAT(CAST((UnitPrice * Quantity) - (UnitPrice * Quantity) * (discount / 100) AS DECIMAL(19, 2)), ' €') AS Total
      #CreatedBy,
      #CreatedAt,
      #UpdatedAt
		from \`order details\` od
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

  browseByOrderId(orderid, result) {
    const query = `
		select
      od.Id,
      od.OrderID,
      od.ProductID,
      (select productName from products p where p.productID = od.productID) as Product,
      CAST(od.UnitPrice AS DECIMAL(19, 2)) as UnitPrice,
      od.Quantity,
      CAST(od.Discount AS DECIMAL(19, 2)) AS Discount,
      CAST((UnitPrice * Quantity) AS DECIMAL(19, 2)) AS SubTotal,
      CAST((UnitPrice * Quantity) - (UnitPrice * Quantity) * (discount / 100) AS DECIMAL(19, 2)) AS Total,
      CreatedBy,
      CreatedAt,
      UpdatedAt
		from \`order details\` od where od.OrderID = ${orderid}
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

  load(id, result) {
    const query = `
		select
      Id,
      OrderID,
      ProductID,
      CAST(UnitPrice AS DECIMAL(19, 2)) as UnitPrice,
      Quantity,
      CAST(Discount AS DECIMAL(19, 2)) as Discount,
      CreatedBy,
      CreatedAt,
      UpdatedAt
		from \`order details\` where Id = ${id}
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

  create(orderDetail, result) {
    orderDetail.CreatedBy = 'admin';
    sql.query(
      `insert into \`order details\` set ?`,
      orderDetail,
      (err) => {
        if (err) {
          result({ ...err }, null);
          return { ...err };
        }
        // console.log('created orderDetail: ', {
        //   id: res.insertId,
        //   ...orderDetail
        // });

        result(null, { ...orderDetail });
        return { ...orderDetail };
      }
    );
  }

  update(id, orderDetail, result) {
    sql.query(
      `update \`order details\`
			 set
        OrderID = ?,
        ProductID = ?,
        UnitPrice = ?,
        Quantity = ?,
        Discount = ?,
        UpdatedAt = ?
			 where Id = ?`,
      [
        orderDetail.OrderID,
        orderDetail.ProductID,
        orderDetail.UnitPrice,
        orderDetail.Quantity,
        orderDetail.Discount,
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
        // console.log('updated orderDetail: ', {
        //   id: id,
        //   ...orderDetail
        // });
        result(null, { ...orderDetail });
        return { ...orderDetail };
      }
    );
  }

  delete(id, result) {
    sql.query(
      `delete from \`order details\` where Id = ?`,
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

export default OrderDetail;
