import * as moment from 'moment';
import sql from '../db';

class Region {
  constructor(region) {
    if (region) {
      this.RegionID = region.RegionID;
      this.RegionDescription = region.RegionDescription;
      this.CreatedBy = region.CreatedBy;
      this.UpdatedAt = region.UpdatedAt;
    }
  }

  browse(result) {
    const query = `
		select
      RegionID,
      RegionDescription
		from Region
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        throw err;
      }
      // console.log('Regions: ', res);
      result(null, res);
    });
  }

  load(id, result) {
    const query = `
		select
      RegionID,
      RegionDescription
		from Region where RegionID = ${id}
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        throw err;
      }

      // console.log('Region: ', res);

      if (res.length === 0) {
        result({ kind: 'not_found' }, null);
      } else {
        result(null, res);
      }
    });
  }

  create(region, result) {
    sql.query('insert into Region set ?', region, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        throw err;
      }
      // console.log('created region: ', {
      //   id: res.insertId,
      //   ...region
      // });
      result(null, { id: res.insertId, ...region });
    });
  }

  update(id, region, result) {
    sql.query(
      `update Region
			 set
        RegionID = ?,
        RegionDescription = ?,
        UpdatedAt = ?
			 where RegionID = ?`,
      [
        region.RegionID,
        region.RegionDescription,
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
          // not found Region with the id
          result({ kind: 'not_found' }, null);
          return;
        }
        // console.log('updated region: ', {
        //   id: id,
        //   ...region
        // });
        result(null, { id: id, ...region });
      }
    );
  }

  delete(id, result) {
    sql.query(
      'delete from Region where RegionID = ?',
      id,
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          throw err;
        }
        if (res.affectedRows === 0) {
          // not found Region with the id
          result({ kind: 'not_found' }, null);
          return;
        }
        // console.log('deleted region with id: ', id);
        result(null, res);
      }
    );
  }
}

export default Region;
