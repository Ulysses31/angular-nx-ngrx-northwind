import * as moment from 'moment';
import sql from '../db';

class User {
  constructor(user) {
    if (user) {
      this.Id = user.Id;
      this.Username = user.Username;
      this.Password = user.Password;
      this.Email = user.Email;
      this.Is_Active = user.Is_Active;
      this.Access_Token = user.Access_Token;
      this.Refresh_Token = user.PRefresh_Token;
      this.CreatedBy = user.CreatedBy;
      this.UpdatedAt = user.UpdatedAt;
    }
  }

  browse(result) {
    const query = `
		select
      Id,
      Username,
      Password,
      Email,
      Is_Active,
      Access_Token,
      Refresh_Token,
      CreatedBy,
      CreatedAt,
      UpdatedAt
		from users
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        throw err;
      }
      // console.log('Users: ', res);
      result(null, res);
    });
  }

  load(id, result) {
    const query = `
		select
      Id,
      Username,
      Password,
      Email,
      Is_Active,
      Access_Token,
      Refresh_Token,
      CreatedBy,
      CreatedAt,
      UpdatedAt
		from users where Id = ${id}
	`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        throw err;
      }

      // console.log('User: ', res);

      if (res.length === 0) {
        result({ kind: 'not_found' }, null);
      } else {
        result(null, res);
      }
    });
  }

  create(user, result) {
    user.CreatedBy = 'admin';
    sql.query('insert into users set ?', user, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        throw err;
      }
      // console.log('created user: ', {
      //   id: res.insertId,
      //   ...user
      // });
      result(null, { id: res.insertId, ...user });
    });
  }

  update(id, user, result) {
    sql.query(
      `update users
			 set
        Id = ?,
        Username = ?,
        Password = ?,
        Email = ?,
        Is_Active = ?,
        Access_Token = ?,
        Refresh_Token = ?,
        UpdatedAt = ?
			 where Id = ?`,
      [
        user.Id,
        user.Username,
        user.Password,
        user.Email,
        user.Is_Active,
        user.Access_Token,
        user.Refresh_Token,
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
          // not found User with the id
          result({ kind: 'not_found' }, null);
          return;
        }
        // console.log('updated user: ', {
        //   id: id,
        //   ...user
        // });
        result(null, { id: id, ...user });
      }
    );
  }

  delete(id, result) {
    sql.query('delete from users where Id = ?', id, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        throw err;
      }
      if (res.affectedRows === 0) {
        // not found User with the id
        result({ kind: 'not_found' }, null);
        return;
      }
      // console.log('deleted user with id: ', id);
      result(null, res);
    });
  }
}

export default User;
