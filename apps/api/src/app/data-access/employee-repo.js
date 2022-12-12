import sql from '../db';

class Employee {
  constructor(employee) {
    if (employee) {
      this.EmployeeID = employee.EmployeeID;
      this.LastName = employee.LastName;
      this.FirstName = employee.FirstName;
      this.Title = employee.Title;
      this.TitleOfCourtesy = employee.TitleOfCourtesy;
      this.BirthDate = employee.BirthDate;
      this.HireDate = employee.HireDate;
      this.Address = employee.Address;
      this.City = employee.City;
      this.Region = employee.Region;
      this.PostalCode = employee.PostalCode;
      this.Country = employee.Country;
      this.HomePhone = employee.HomePhone;
      this.Extension = employee.Extension;
      this.Notes = employee.Notes;
      this.ReportsTo = employee.ReportsTo;
      this.PhotoPath = employee.PhotoPath;
      this.CreatedBy = employee.CreatedBy;
      this.UpdatedAt = employee.UpdatedAt;
    }
  }

  browse(result) {
    const query = `
		select
			EmployeeID,
			LastName,
			FirstName,
			Title,
			TitleOfCourtesy,
			BirthDate,
			HireDate,
			Address,
			City,
			Region,
			PostalCode,
			Country,
			HomePhone,
			Extension,
			Notes,
			ReportsTo,
			PhotoPath
		from employees
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
      console.log('Employees: ', res);
      result(null, res);
    });
  }

  load(id, result) {
    const query = `
		select
			EmployeeID,
			LastName,
			FirstName,
			Title,
			TitleOfCourtesy,
			BirthDate,
			HireDate,
			Address,
			City,
			Region,
			PostalCode,
			Country,
			HomePhone,
			Extension,
			Notes,
			ReportsTo,
			PhotoPath
		from employees where EmployeeID = ${id}
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('Employee: ', res);

      if (res.length === 0) {
        result({ kind: 'not_found' }, null);
      } else {
        result(null, res);
      }
    });
  }

  create(employee, result) {
    sql.query('insert into employees set ?', employee, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      console.log('created employee: ', {
        id: res.insertId,
        ...employee
      });
      result(null, { id: res.insertId, ...employee });
    });
  }

  update(id, employee, result) {
    sql.query(
      `update employees
			 set
			 	LastName = ?,
				FirstName = ?,
				Title = ?,
				TitleOfCourtesy = ?,
				BirthDate = ?,
				HireDate = ?,
				Address = ?,
				City = ?,
				Region = ?,
				PostalCode = ?,
				Country = ?,
				HomePhone = ?,
				Extension = ?,
				Notes = ?,
				ReportsTo = ?,
				PhotoPath = ?,
        UpdatedAt = ?
			 where EmployeeID = ?`,
      [
        employee.LastName,
        employee.FirstName,
        employee.Title,
        employee.TitleOfCourtesy,
        employee.BirthDate,
        employee.HireDate,
        employee.Address,
        employee.City,
        employee.Region,
        employee.PostalCode,
        employee.Country,
        employee.HomePhone,
        employee.Extension,
        employee.Notes,
        employee.ReportsTo,
        employee.PhotoPath,
        employee.UpdatedAt,
        id
      ],
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          return;
        }
        if (res.affectedRows === 0) {
          // not found Employee with the id
          result({ kind: 'not_found' }, null);
          return;
        }
        console.log('updated employee: ', {
          id: id,
          ...employee
        });
        result(null, { id: id, ...employee });
      }
    );
  }

  delete(id, result) {
    sql.query(
      'delete from employees where EmployeeID = ?',
      id,
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          return;
        }
        if (res.affectedRows === 0) {
          // not found Employee with the id
          result({ kind: 'not_found' }, null);
          return;
        }
        console.log('deleted employee with id: ', id);
        result(null, res);
      }
    );
  }
}

export default Employee;
