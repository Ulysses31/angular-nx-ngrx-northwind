import sql from '../db';

class SalesTotalPerCategory {
  constructor(salesTotalPerCategory) {
    if (salesTotalPerCategory) {
      this.Year = salesTotalPerCategory.Year;
      this.CategoryName = salesTotalPerCategory.salesTotalPerCategory;
      this.SubTotal = salesTotalPerCategory.SubTotal;
      this.Total = salesTotalPerCategory.Total;
    }
  }

  load(year, result) {
    const query = `
      SELECT
        t.Year,
        t.CategoryName,
        SUM(t.SubTotal) AS SubTotal,
        SUM(t.Total) AS Total
      FROM (
        SELECT
          YEAR(o.shippedDate) AS Year,
          c.CategoryName,
          CAST((od.UnitPrice * od.Quantity) AS DECIMAL(19, 2)) AS SubTotal,
          CAST( (od.UnitPrice * od.Quantity) - (od.UnitPrice * od.Quantity) * (od.discount / 100) AS DECIMAL(19, 2) ) AS Total
        FROM orders o
        INNER JOIN \`order details\` od
          ON o.OrderID = od.OrderID
        INNER JOIN products p
          ON od.ProductID = p.ProductID
        INNER JOIN categories c
          ON p.CategoryID = c.CategoryID
        WHERE 1=1
          AND o.shippedDate IS NOT NULL
          AND o.shippedDate BETWEEN '${year}-01-01' AND '${year}-12-31'
      ) t
      GROUP BY t.CategoryName
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

export default SalesTotalPerCategory;
