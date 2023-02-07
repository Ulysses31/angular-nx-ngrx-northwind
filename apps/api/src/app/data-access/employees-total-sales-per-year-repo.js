import sql from '../db';

class EmployeesTotalSalesPerYear {
  constructor(employeesTotalSalesPerYear) {
    if (employeesTotalSalesPerYear) {
      this.Year = employeesTotalSalesPerYear.Year;
      this.Employee = employeesTotalSalesPerYear.Employee;
      this.Total = employeesTotalSalesPerYear.Total;
    }
  }

  load(year, result) {
    const query = `
      SELECT
        t.Year,
        t.Employee,
        COUNT(t.EmployeeID) AS Total
      FROM (
        SELECT
          YEAR(o.shippedDate) AS YEAR,
          e.EmployeeID,
          CONCAT(e.LastName, ' ', e.Firstname) AS Employee
        FROM orders o
        INNER JOIN employees e
          ON o.EmployeeID = e.EmployeeID
        WHERE 1=1
          AND o.ShippedDate IS NOT NULL
          AND o.shippedDate BETWEEN '${year}-01-01' AND '${year}-12-31'
      ) t
      GROUP BY t.EmployeeID
      ORDER BY COUNT(t.EmployeeID) DESC
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

export default EmployeesTotalSalesPerYear;
