import sql from '../db';

class SalesTotalAmountPerYear {
  constructor(salesTotalAmountPerYear) {
    if (salesTotalAmountPerYear) {
      this.Year = salesTotalAmountPerYear.Year;
      this.TotalAmount = salesTotalAmountPerYear.TotalAmount;
    }
  }

  browse(result) {
    const query = `
      SELECT
          YEAR(v.shippedDate) AS Year,
          SUM(v.Total) AS TotalAmount
      FROM (
        SELECT
          t.shippedDate,
          t.OrderID,
          SUM(t.Total) AS Total
        FROM (
          SELECT
            o.shippedDate,
            o.orderID,
            CAST((od.UnitPrice * od.Quantity) AS DECIMAL(19, 2)) AS SubTotal,
            CAST( (od.UnitPrice * od.Quantity) - (od.UnitPrice * od.Quantity) * (od.discount / 100) AS DECIMAL(19, 2) ) AS Total
          FROM orders o INNER JOIN \`order details\` od
          ON o.OrderID = od.OrderID
          WHERE 1=1
          AND o.shippedDate IS NOT NULL
          AND o.shippedDate BETWEEN '1996-01-01' AND '1996-12-31'
        ) t
        GROUP BY t.OrderID
      ) v
      UNION
      SELECT
          YEAR(b.shippedDate) AS Year,
          SUM(b.Total) AS TotalAmount
      FROM (
        SELECT
          t.shippedDate,
          t.OrderID,
          SUM(t.Total) AS Total
        FROM (
          SELECT
            o.shippedDate,
            o.orderID,
            CAST((od.UnitPrice * od.Quantity) AS DECIMAL(19, 2)) AS SubTotal,
            CAST( (od.UnitPrice * od.Quantity) - (od.UnitPrice * od.Quantity) * (od.discount / 100) AS DECIMAL(19, 2) ) AS Total
          FROM orders o INNER JOIN \`order details\` od
          ON o.OrderID = od.OrderID
          WHERE 1=1
          AND o.shippedDate IS NOT NULL
          AND o.shippedDate BETWEEN '1997-01-01' AND '1997-12-31'
        ) t
        GROUP BY t.OrderID
      ) b
      UNION
      SELECT
          YEAR(n.shippedDate) AS Year,
          SUM(n.Total) AS TotalAmount
      FROM (
        SELECT
          t.shippedDate,
          t.OrderID,
          SUM(t.Total) AS Total
        FROM (
          SELECT
            o.shippedDate,
            o.orderID,
            CAST((od.UnitPrice * od.Quantity) AS DECIMAL(19, 2)) AS SubTotal,
            CAST( (od.UnitPrice * od.Quantity) - (od.UnitPrice * od.Quantity) * (od.discount / 100) AS DECIMAL(19, 2) ) AS Total
          FROM orders o INNER JOIN \`order details\` od
          ON o.OrderID = od.OrderID
          WHERE 1=1
          AND o.shippedDate IS NOT NULL
          AND o.shippedDate BETWEEN '1998-01-01' AND '1998-12-31'
        ) t
        GROUP BY t.OrderID
      ) n
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
}

export default SalesTotalAmountPerYear;
