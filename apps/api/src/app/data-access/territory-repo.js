import * as moment from 'moment';
import sql from '../db';

class Territory {
  constructor(territory) {
    if (territory) {
      this.TerritoryID = territory.TerritoryID;
      this.TerritoryDescription = territory.TerritoryDescription;
      this.RegionID = territory.RegionID;
      this.CreatedBy = territory.CreatedBy;
      this.UpdatedAt = territory.UpdatedAt;
    }
  }

  browse(result) {
    const query = `
		select
      TerritoryID,
      TerritoryDescription,
      RegionID,
      CreatedBy,
      CreatedAt,
      UpdatedAt
		from territories
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        throw err;
      }
      // console.log('Territories: ', res);
      result(null, res);
    });
  }

  load(id, result) {
    const query = `
		select
      TerritoryID,
      TerritoryDescription,
      RegionID,
      CreatedBy,
      CreatedAt,
      UpdatedAt
		from territories where TerritoryID = ${id}
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        throw err;
      }

      // console.log('Territory: ', res);

      if (res.length === 0) {
        result({ kind: 'not_found' }, null);
      } else {
        result(null, res);
      }
    });
  }

  create(territory, result) {
    sql.query(
      'insert into territories set ?',
      territory,
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(err, null);
          throw err;
        }
        // console.log('created territory: ', {
        //   id: res.insertId,
        //   ...territory
        // });
        result(null, { id: res.insertId, ...territory });
      }
    );
  }

  update(id, territory, result) {
    sql.query(
      `update territories
			 set
        TerritoryID = ?,
        TerritoryDescription = ?,
        RegionID = ?,
        UpdatedAt = ?
			 where TerritoryID = ?`,
      [
        territory.TerritoryID,
        territory.TerritoryDescription,
        territory.RegionID,
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
          // not found Territory with the id
          result({ kind: 'not_found' }, null);
          return;
        }
        // console.log('updated territory: ', {
        //   id: id,
        //   ...territory
        // });
        result(null, { id: id, ...territory });
      }
    );
  }

  delete(id, result) {
    sql.query(
      'delete from territories where TerritoryID = ?',
      id,
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          throw err;
        }
        if (res.affectedRows === 0) {
          // not found Territory with the id
          result({ kind: 'not_found' }, null);
          return;
        }
        // console.log('deleted territory with id: ', id);
        result(null, res);
      }
    );
  }
}

export default Territory;
