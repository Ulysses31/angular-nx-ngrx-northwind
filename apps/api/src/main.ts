import * as express from 'express';
import * as path from 'path';

import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';

import employeeRouter from './app/routes/employee-route.js';

// import * as mysql from 'mysql';
// import sqlConfig from './app/db.config.js';

const app = express();

// ### MySQL Connection  ##############################
// console.log(sqlConfig);
//
// const connection = mysql.createConnection({
//   host: sqlConfig.host,
//   user: sqlConfig.user,
//   password: sqlConfig.password,
//   database: sqlConfig.db
// });
//
// connection.connect((error) => {
//   if (error) throw error;
//   console.log('Successfully connected to the database.');
// });
// ### MySQL Connection  ##############################

app.use(cookieParser());
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use((req, res, next) => {
  if (req) {
    // console.log(req);
    // console.log(req.headers);
    // console.log(`Protocol: ${req.protocol}`);
    // console.log(`Host: ${req.hostname}`);
    // console.log(`Url: ${req.url}`);
    // console.log(`Method: ${req.method}`);
    // console.log(`Status Code: ${req.statusCode}`);
    // console.log(`Status Message: ${req.statusMessage}`);
    // console.log(`Params: ${JSON.stringify(req.params)}`);
    // console.log(`Query: ${JSON.stringify(req.query)}`);
    // console.log(`Body: ${JSON.stringify(req.body)}`);
    // console.log(`Cookies: ${JSON.stringify(req.cookies)}`);
    // console.log(`Ip: ${JSON.stringify(req.ip)}`);
  }
  if (res) {
    //  // console.log(res);
    res.on('finish', () => {
     // console.log(`
     // 		  Response:
     //       ${JSON.stringify({
     //         statusCode: res.statusCode,
     //         statusMessage: res.statusMessage,
     //         headers: res['_header'],
     //         body: res.json
     //       })}`);
      console.log({
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        headers: res['_header'],
        pid: process.pid,
        pTitle: process.title,
        memory: process.memoryUsage(),
        cpuUsage: process.cpuUsage(),
        uptime: process.uptime()
      });
    });
  }
  next();
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.use('/employee', employeeRouter);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
