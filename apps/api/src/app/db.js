import * as mysql from 'mysql';
import sqlConfig from './db.config';

const connection = mysql.createConnection({
  host: sqlConfig.host,
  user: sqlConfig.user,
  password: sqlConfig.password,
  database: sqlConfig.db
});

connection.connect(async (error) => {
  if (error) throw error;
  // console.log('Successfully connected to the database.');
});

export default connection;
