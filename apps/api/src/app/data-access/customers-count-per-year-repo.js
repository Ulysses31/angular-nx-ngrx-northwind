import sql from '../db';

class CustomersCountPerYear {
  constructor(customersCountPerYear) {
    if (customersCountPerYear) {
      this.Year = customersCountPerYear.Year;
      this.Customer = customersCountPerYear.Customer;
    }
  }

  browse(result) {
    const query = `
      SELECT
        YEAR(o.ShippedDate) AS YEAR,
        COUNT(CustomerID) Customers
      FROM orders o
      WHERE 1=1
        AND o.ShippedDate IS NOT NULL
        AND o.shippedDate BETWEEN '1996-01-01' AND '1996-12-31'
      UNION
      SELECT
        YEAR(o.ShippedDate) AS YEAR,
        COUNT(CustomerID) Customers
      FROM orders o
      WHERE 1=1
        AND o.ShippedDate IS NOT NULL
        AND o.shippedDate BETWEEN '1997-01-01' AND '1997-12-31'
      UNION
      SELECT
        YEAR(o.ShippedDate) AS YEAR,
        COUNT(CustomerID) Customers
      FROM orders o
      WHERE 1=1
        AND o.ShippedDate IS NOT NULL
        AND o.shippedDate BETWEEN '1998-01-01' AND '1998-12-31'

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

export default CustomersCountPerYear;
