const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  db: process.env.DB_NAME,
  host: process.env.DB_HOST
}

export default sqlConfig;
