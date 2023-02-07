import sql from '../db';

class CustomersCountOrderPerYear {
  constructor(customersCountOrderPerYear) {
    if (customersCountOrderPerYear) {
      this.Year = customersCountOrderPerYear.Year;
      this.Customer = customersCountOrderPerYear.Customer;
      this.Total = customersCountOrderPerYear.Total;
    }
  }

  load(year, result) {
    const query = `
    SELECT
      YEAR(o.ShippedDate) AS YEAR,
      (SELECT CompanyName FROM customers WHERE CustomerID = o.CustomerID) AS Customer,
      COUNT(o.CustomerID) AS Total
    FROM orders o
    WHERE 1=1
      AND o.ShippedDate IS NOT NULL
      AND o.shippedDate BETWEEN '${year}-01-01' AND '${year}-12-31'
    GROUP BY o.CustomerID
    ORDER BY COUNT(o.CustomerID) DESC
    LIMIT 5
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

export default CustomersCountOrderPerYear;
