import * as moment from 'moment';
import sql from '../db';

class EmployeeTerritory {
  constructor(employeeTerritory) {
    if (employeeTerritory) {
      this.Id = employeeTerritory.Id;
      this.EmployeeID = employeeTerritory.EmployeeID;
      this.TerritoryID = employeeTerritory.TerritoryID;
      this.CreatedBy = employeeTerritory.CreatedBy;
      this.UpdatedAt = employeeTerritory.UpdatedAt;
    }
  }

  browse(result) {
    const query = `
		select
      t.Id,
      #t.EmployeeID,
      (SELECT CONCAT(LASTNAME, ' ', FIRSTNAME) FROM employees e WHERE e.EmployeeID = t.EmployeeID) AS Employee,
      #t.TerritoryID
      (SELECT TERRITORYDESCRIPTION FROM territories tr WHERE tr.territoryID = t.TerritoryID) AS Territory
      #CreatedBy,
      #CreatedAt,
      #UpdatedAt
		from employeeTerritories t
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        throw err;
      }
      // console.log('EmployeeTerritories: ', res);
      result(null, res);
    });
  }

  load(id, result) {
    const query = `
		select
      t.Id,
      t.EmployeeID,
      (SELECT CONCAT(LASTNAME, ' ', FIRSTNAME) FROM employees e WHERE e.EmployeeID = t.EmployeeID) AS LU_Employee,
      t.TerritoryID,
      (SELECT TERRITORYDESCRIPTION FROM territories tr WHERE tr.territoryID = t.TerritoryID) AS LU_Territory,
      t.CreatedBy,
      t.CreatedAt,
      t.UpdatedAt
		from employeeTerritories t where Id = ${id}
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        throw err;
      }

      // console.log('EmployeeTerritory: ', res);

      if (res.length === 0) {
        result({ kind: 'not_found' }, null);
      } else {
        result(null, res);
      }
    });
  }

  create(employeeTerritory, result) {
    employeeTerritory.CreatedBy = 'admin';
    sql.query(
      'insert into employeeTerritories set ?',
      employeeTerritory,
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(err, null);
          throw err;
        }
        // console.log('created employeeTerritory: ', {
        //   id: res.insertId,
        //   ...employeeTerritory
        // });
        result(null, { id: res.insertId, ...employeeTerritory });
      }
    );
  }

  update(id, employeeTerritory, result) {
    sql.query(
      `update employeeterritories
			 set
        EmployeeID = ?,
        TerritoryID = ?,
        UpdatedAt = ?
			 where Id = ?`,
      [
        (this.EmployeeID = employeeTerritory.EmployeeID),
        (this.TerritoryID = employeeTerritory.TerritoryID),
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
          // not found EmployeeTerritory with the id
          result({ kind: 'not_found' }, null);
          return;
        }
        // console.log('updated employeeTerritory: ', {
        //   id: id,
        //   ...employeeTerritory
        // });
        result(null, { id: id, ...employeeTerritory });
      }
    );
  }

  delete(id, result) {
    console.log('ID: ' + id);
    sql.query(
      'delete from employeeTerritories where Id = ?',
      id,
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          throw err;
        }
        if (res.affectedRows === 0) {
          // not found EmployeeTerritory with the id
          result({ kind: 'not_found' }, null);
          return;
        }
        // console.log('deleted employeeTerritory with id: ', id);
        result(null, res);
      }
    );
  }
}

export default EmployeeTerritory;
