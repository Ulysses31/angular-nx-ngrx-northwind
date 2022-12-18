import * as express from 'express';
import * as path from 'path';

import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';

import * as swaggerUi from 'swagger-ui-express';
import * as swaggerJsdoc from 'swagger-jsdoc';

import employeeRouter from './app/routes/employee-route';
import categoryRouter from './app/routes/category-route';
import customerRouter from './app/routes/employee-route';
import employeeTerritoryRouter from './app/routes/employee-territory-route';
import orderDetailRouter from './app/routes/order-detail-route';
import orderRouter from './app/routes/order-route';
import productRouter from './app/routes/product-route';
import regionRouter from './app/routes/region-route';
import shipperRouter from './app/routes/shipper-route';
import supplierRouter from './app/routes/supplier-route';
import territoryRouter from './app/routes/territory-route';
import userRouter from './app/routes/user-route';

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
      // console.log({
      //    statusCode: res.statusCode,
      //    statusMessage: res.statusMessage,
      //    headers: res['_header'],
      //    pid: process.pid,
      //    pTitle: process.title,
      //    memory: process.memoryUsage(),
      //    cpuUsage: process.cpuUsage(),
      //    uptime: process.uptime()
      //  });
    });
  }
  next();
});

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.use('/employee', employeeRouter);
app.use('/category', categoryRouter);
app.use('/employee', customerRouter);
app.use('/employee-territory', employeeTerritoryRouter);
app.use('/order', orderRouter);
app.use('/order-detail', orderDetailRouter);
app.use('/product', productRouter);
app.use('/region', regionRouter);
app.use('/shipper', shipperRouter);
app.use('/supplier', supplierRouter);
app.use('/territory', territoryRouter);
app.use('/user', userRouter);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Northwind Nx Express API Server',
      version: '0.1.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      contact: {
        name: 'Northwind',
        url: 'https://northwind.com',
        email: 'info@email.com'
      },
      basePath: '/api-docs'
    },
    servers: [
      {
        url: 'http://localhost:3333'
      },
      {
        url: 'https://localhost:3333'
      }
    ],
    failOnErrors: true,
    paths: {
      '/category': {
        get: {
          tags: ['Category'],
          operationId: 'findAllCategories',
          summary: 'Get list of categories',
          description: 'Category list',
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Category'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Category'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Category'],
          operationId: 'createNewCategory',
          summary: 'Create a new category',
          description: 'Insert new category',
          requestBody: {
            description: 'Create a new category',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Category'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Category'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Category'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Category'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/customer': {
        get: {
          tags: ['Customer'],
          operationId: 'findAllCustomers',
          summary: 'Get list of customers',
          description: 'Customer list',
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Customer'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Customer'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Customer'],
          operationId: 'createNewCustomer',
          summary: 'Create a new employee',
          description: 'Insert new employee',
          requestBody: {
            description: 'Create a new employee',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Customer'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Customer'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Customer'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Customer'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/employee': {
        get: {
          tags: ['Employee'],
          operationId: 'findAllEmployees',
          summary: 'Get list of employees',
          description: 'Employee list',
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Employee'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Employee'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Employee'],
          operationId: 'createNewEmployee',
          summary: 'Create a new employee',
          description: 'Insert new employee',
          requestBody: {
            description: 'Create a new employee',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Employee'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Employee'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Employee'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Employee'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/order-detail': {
        get: {
          tags: ['Order Detail'],
          operationId: 'findAllOrderDetails',
          summary: 'Get list of employees',
          description: 'Order Detail list',
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/OrderDetail'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/OrderDetail'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Order Detail'],
          operationId: 'createNewOrderDetail',
          summary: 'Create a new order detail',
          description: 'Insert new order detail',
          requestBody: {
            description: 'Create a new order detail',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/OrderDetail'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/OrderDetail'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/OrderDetail'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/OrderDetail'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/order': {
        get: {
          tags: ['Order'],
          operationId: 'findAllOrders',
          summary: 'Get list of orders',
          description: 'Order list',
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Order'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Order'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Order'],
          operationId: 'createNewOrder',
          summary: 'Create a new order',
          description: 'Insert new order',
          requestBody: {
            description: 'Create a new order',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Order'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Order'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Order'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Order'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/product': {
        get: {
          tags: ['Product'],
          operationId: 'findAllProducts',
          summary: 'Get list of products',
          description: 'Product list',
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Product'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Product'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Product'],
          operationId: 'createNewProduct',
          summary: 'Create a new product',
          description: 'Insert new product',
          requestBody: {
            description: 'Create a new product',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Product'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Product'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Product'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/region': {
        get: {
          tags: ['Region'],
          operationId: 'findAllRegions',
          summary: 'Get list of regions',
          description: 'Region list',
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Region'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Region'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Region'],
          operationId: 'createNewRegion',
          summary: 'Create a new region',
          description: 'Insert new region',
          requestBody: {
            description: 'Create a new region',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Region'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Region'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Region'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Region'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/shipper': {
        get: {
          tags: ['Shipper'],
          operationId: 'findAllShippers',
          summary: 'Get list of shippers',
          description: 'Shipper list',
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Shipper'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Shipper'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Shipper'],
          operationId: 'createNewShipper',
          summary: 'Create a new shipper',
          description: 'Insert new shipper',
          requestBody: {
            description: 'Create a new shipper',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Shipper'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Shipper'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Shipper'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Shipper'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/supplier': {
        get: {
          tags: ['Supplier'],
          operationId: 'findAllSuppliers',
          summary: 'Get list of suppliers',
          description: 'Supplier list',
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Supplier'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Supplier'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Supplier'],
          operationId: 'createNewSupplier',
          summary: 'Create a new supplier',
          description: 'Insert new supplier',
          requestBody: {
            description: 'Create a new supplier',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Supplier'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Supplier'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Supplier'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Supplier'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/territory': {
        get: {
          tags: ['Territory'],
          operationId: 'findAllTerritories',
          summary: 'Get list of Territories',
          description: 'Territory list',
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Territory'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Territory'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['Territory'],
          operationId: 'createNewTerritory',
          summary: 'Create a new territory',
          description: 'Insert new territory',
          requestBody: {
            description: 'Create a new territory',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Territory'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Territory'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Territory'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Territory'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/user': {
        get: {
          tags: ['User'],
          operationId: 'findAllUsers',
          summary: 'Get list of Users',
          description: 'User list',
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/User'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/User'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          tags: ['User'],
          operationId: 'createNewUser',
          summary: 'Create a new User',
          description: 'Insert new User',
          requestBody: {
            description: 'Create a new User',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/User'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/User'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/category/{id}': {
        get: {
          tags: ['Category'],
          operationId: 'findCategoryById',
          summary: 'Get category by id',
          description: 'Cet category by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the category',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Category'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Category'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        put: {
          tags: ['Category'],
          operationId: 'updateCategory',
          summary: 'Update existing category',
          description: 'Update existing category',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the category to update',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          requestBody: {
            description: 'Update existing category',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Category'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Category'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Category'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Category'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Category'],
          operationId: 'deleteCategory',
          summary: 'Delete existing category',
          description: 'Delete category by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the category',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Category'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Category'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/customer/{id}': {
        get: {
          tags: ['Customer'],
          operationId: 'findCustomerById',
          summary: 'Get customer by id',
          description: 'Cet customer by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the customer',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Customer'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Customer'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        put: {
          tags: ['Customer'],
          operationId: 'updateCustomer',
          summary: 'Update existing customer',
          description: 'Update existing customer',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the customer to update',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          requestBody: {
            description: 'Update existing customer',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Customer'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Customer'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Customer'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Customer'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Customer'],
          operationId: 'deleteCustomer',
          summary: 'Delete existing customer',
          description: 'Delete customer by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the customer',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Customer'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Customer'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/employee/{id}': {
        get: {
          tags: ['Employee'],
          operationId: 'findEmployeeById',
          summary: 'Get employee by id',
          description: 'Cet employee by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the employee',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Employee'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Employee'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        put: {
          tags: ['Employee'],
          operationId: 'updateEmployee',
          summary: 'Update existing employee',
          description: 'Update existing employee',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the employee to update',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          requestBody: {
            description: 'Update existing employee',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Employee'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Employee'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Employee'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Employee'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Employee'],
          operationId: 'deleteEmployee',
          summary: 'Delete existing employee',
          description: 'Delete employee by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the employee',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Employee'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Employee'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/order-detail/{id}': {
        get: {
          tags: ['Order Detail'],
          operationId: 'findOrderDetailById',
          summary: 'Get order detail by id',
          description: 'Cet order detail by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the order detail',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/OrderDetail'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/OrderDetail'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        put: {
          tags: ['Order Detail'],
          operationId: 'updateOrderDetail',
          summary: 'Update existing order detail',
          description: 'Update existing order detail',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the order detail to update',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          requestBody: {
            description: 'Update existing order detail',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/OrderDetail'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/OrderDetail'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/OrderDetail'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/OrderDetail'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Order Detail'],
          operationId: 'deleteOrderDetail',
          summary: 'Delete existing order detail',
          description: 'Delete order detail by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the order detail',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/OrderDetail'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/OrderDetail'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/order/{id}': {
        get: {
          tags: ['Order'],
          operationId: 'findOrderById',
          summary: 'Get order by id',
          description: 'Cet order by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the order',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Order'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Order'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        put: {
          tags: ['Order'],
          operationId: 'updateOrder',
          summary: 'Update existing order',
          description: 'Update existing order',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the order to update',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          requestBody: {
            description: 'Update existing order',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Order'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Order'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Order'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Order'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Order'],
          operationId: 'deleteOrder',
          summary: 'Delete existing order',
          description: 'Delete order by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the order',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Order'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Order'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/product/{id}': {
        get: {
          tags: ['Product'],
          operationId: 'findProductById',
          summary: 'Get product by id',
          description: 'Cet product by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the product',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Product'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Product'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        put: {
          tags: ['Product'],
          operationId: 'updateProduct',
          summary: 'Update existing product',
          description: 'Update existing product',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the product to update',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          requestBody: {
            description: 'Update existing product',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Product'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Product'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Product'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Product'],
          operationId: 'deleteProduct',
          summary: 'Delete existing product',
          description: 'Delete product by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the product',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Product'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Product'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/region/{id}': {
        get: {
          tags: ['Region'],
          operationId: 'findRegionById',
          summary: 'Get region by id',
          description: 'Cet region by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the region',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Region'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Region'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        put: {
          tags: ['Region'],
          operationId: 'updateRegion',
          summary: 'Update existing region',
          description: 'Update existing region',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the region to update',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          requestBody: {
            description: 'Update existing region',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Region'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Region'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Region'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Region'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Region'],
          operationId: 'deleteRegion',
          summary: 'Delete existing region',
          description: 'Delete region by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the region',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Region'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Region'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/shipper/{id}': {
        get: {
          tags: ['Shipper'],
          operationId: 'findShipperById',
          summary: 'Get shipper by id',
          description: 'Cet shipper by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the shipper',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Shipper'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Shipper'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        put: {
          tags: ['Shipper'],
          operationId: 'updateShipper',
          summary: 'Update existing shipper',
          description: 'Update existing shipper',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the shipper to update',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          requestBody: {
            description: 'Update existing shipper',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Shipper'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Shipper'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Shipper'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Shipper'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Shipper'],
          operationId: 'deleteShipper',
          summary: 'Delete existing shipper',
          description: 'Delete shipper by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the shipper',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Shipper'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Shipper'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/supplier/{id}': {
        get: {
          tags: ['Supplier'],
          operationId: 'findSupplierById',
          summary: 'Get supplier by id',
          description: 'Cet supplier by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the supplier',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Supplier'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Supplier'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        put: {
          tags: ['Supplier'],
          operationId: 'updateSupplier',
          summary: 'Update existing supplier',
          description: 'Update existing supplier',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the supplier to update',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          requestBody: {
            description: 'Update existing supplier',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Supplier'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Supplier'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Supplier'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Supplier'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Supplier'],
          operationId: 'deleteSupplier',
          summary: 'Delete existing supplier',
          description: 'Delete supplier by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the supplier',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Supplier'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Supplier'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/territory/{id}': {
        get: {
          tags: ['Territory'],
          operationId: 'findTerritoryById',
          summary: 'Get Territory by id',
          description: 'Cet Territory by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the Territory',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Territory'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Territory'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        put: {
          tags: ['Territory'],
          operationId: 'updateTerritory',
          summary: 'Update existing Territory',
          description: 'Update existing Territory',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the Territory to update',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          requestBody: {
            description: 'Update existing Territory',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Territory'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/Territory'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Territory'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Territory'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        delete: {
          tags: ['Territory'],
          operationId: 'deleteTerritory',
          summary: 'Delete existing Territory',
          description: 'Delete Territory by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the Territory',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Territory'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Territory'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/user/{id}': {
        get: {
          tags: ['User'],
          operationId: 'findUserById',
          summary: 'Get User by id',
          description: 'Cet User by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the User',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/User'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/User'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        put: {
          tags: ['User'],
          operationId: 'updateUser',
          summary: 'Update existing User',
          description: 'Update existing User',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the User to update',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          requestBody: {
            description: 'Update existing User',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              },
              'application/xml': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/User'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/User'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        },
        delete: {
          tags: ['User'],
          operationId: 'deleteUser',
          summary: 'Delete existing User',
          description: 'Delete User by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'ID of the User',
              required: 'true',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'successful operation',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/User'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/User'
                    }
                  }
                }
              }
            },
            '400': {
              description: 'Invalid status value',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            },
            '500': {
              description: 'Bad server request',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                },
                'application/xml': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/ErrorSchema'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    components: {
      schemas: {
        Category: {
          type: 'object',
          description: 'Category entity',
          properties: {
            CategoryID: {
              type: 'string',
              description: 'Id of the category',
              example: '1'
            },
            CategoryName: {
              type: 'string',
              description: 'Name of the category'
            },
            Description: {
              type: 'string',
              description: 'Description of the category'
            }
          }
        },
        Employee: {
          type: 'object',
          description: 'Employee entity',
          properties: {
            EmployeeID: {
              type: 'string',
              description: 'Id of the employee',
              example: '1'
            },
            LastName: {
              type: 'string',
              description: 'LastName of the employee'
            },
            FirstName: {
              type: 'string',
              description: 'FirstName of the employee'
            },
            Title: {
              type: 'string',
              description: 'Title of the employee'
            },
            TitleOfCourtesy: {
              type: 'string',
              description: 'TitleOfCourtesy of the employee'
            },
            BirthDate: {
              type: 'date',
              description: 'BirthDate of the employee'
            },
            HireDate: {
              type: 'date',
              description: 'HireDate of the employee'
            },
            Address: {
              type: 'string',
              description: 'Address of the employee'
            },
            City: {
              type: 'string',
              description: 'City of the employee'
            },
            Region: {
              type: 'string',
              description: 'Region of the employee'
            },
            PostalCode: {
              type: 'string',
              description: 'PostalCode of the employee'
            },
            Country: {
              type: 'string',
              description: 'Country of the employee'
            },
            HomePhone: {
              type: 'string',
              description: 'HomePhone of the employee'
            },
            Extension: {
              type: 'string',
              description: 'Extension of the employee'
            },
            Notes: {
              type: 'string',
              description: 'Notes of the employee'
            },
            ReportsTo: {
              type: 'string',
              description: 'ReportsTo of the employee'
            },
            PhotoPath: {
              type: 'string',
              description: 'PhotoPath of the employee'
            }
          }
        },
        Customer: {
          type: 'object',
          description: 'Customer entity',
          properties: {
            CustomerID: {
              type: 'string',
              description: 'Id of the employee',
              example: '1'
            },
            CompanyName: {
              type: 'string',
              description: 'CompanyName of the employee'
            },
            ContactName: {
              type: 'string',
              description: 'ContactName of the employee'
            },
            ContactTitle: {
              type: 'string',
              description: 'ContactTitle of the employee'
            },
            Address: {
              type: 'string',
              description: 'Address of the employee'
            },
            City: {
              type: 'string',
              description: 'City of the employee'
            },
            Region: {
              type: 'string',
              description: 'Region of the employee'
            },
            PostalCode: {
              type: 'string',
              description: 'PostalCode of the employee'
            },
            Country: {
              type: 'string',
              description: 'Country of the employee'
            },
            Phone: {
              type: 'string',
              description: 'Phone of the employee'
            },
            Fax: {
              type: 'string',
              description: 'Fax of the employee'
            }
          }
        },
        OrderDetail: {
          type: 'object',
          description: 'Order Detail entity',
          properties: {
            Id: {
              type: 'string',
              description: 'Id of the order detail',
              example: '1'
            },
            OrderID: {
              type: 'string',
              description: 'OrderID of the order detail'
            },
            ProductID: {
              type: 'string',
              description: 'ProductID of the order detail'
            },
            UnitPrice: {
              type: 'string',
              description: 'UnitPrice of the order detail'
            },
            Quantity: {
              type: 'string',
              description: 'Quantity of the order detail'
            },
            Discount: {
              type: 'string',
              description: 'Discount of the order detail'
            }
          }
        },
        Order: {
          type: 'object',
          description: 'Order entity',
          properties: {
            OrderID: {
              type: 'string',
              description: 'Id of the order',
              example: '1'
            },
            CustomerID: {
              type: 'string',
              description: 'CustomerID of the order'
            },
            EmployeeID: {
              type: 'string',
              description: 'EmployeeID of the order'
            },
            OrderDate: {
              type: 'date',
              description: 'OrderDate of the order'
            },
            RequiredDate: {
              type: 'date',
              description: 'RequiredDate of the order'
            },
            ShippedDate: {
              type: 'date',
              description: 'ShippedDate of the order'
            },
            ShipVia: {
              type: 'string',
              description: 'ShipVia of the order'
            },
            Freight: {
              type: 'string',
              description: 'Freight of the order'
            },
            ShipName: {
              type: 'string',
              description: 'ShipName of the order'
            },
            ShipAddress: {
              type: 'string',
              description: 'ShipAddress of the order'
            },
            ShipCity: {
              type: 'string',
              description: 'ShipCity of the order'
            },
            ShipRegion: {
              type: 'string',
              description: 'ShipRegion of the order'
            },
            ShipPostalCode: {
              type: 'string',
              description: 'ShipPostalCode of the order'
            },
            ShipCountry: {
              type: 'string',
              description: 'ShipCountry of the order'
            }
          }
        },
        Product: {
          type: 'object',
          description: 'Product entity',
          properties: {
            ProductID: {
              type: 'string',
              description: 'Id of the product',
              example: '1'
            },
            ProductName: {
              type: 'string',
              description: 'ProductName of the product'
            },
            SupplierID: {
              type: 'string',
              description: 'SupplierID of the product'
            },
            CategoryID: {
              type: 'string',
              description: 'CategoryID of the product'
            },
            QuantityPerUnit: {
              type: 'string',
              description: 'QuantityPerUnit of the product'
            },
            UnitPrice: {
              type: 'string',
              description: 'UnitPrice of the product'
            },
            UnitsInStock: {
              type: 'string',
              description: 'UnitsInStock of the product'
            },
            UnitsOnOrder: {
              type: 'string',
              description: 'UnitsOnOrder of the product'
            },
            ReorderLevel: {
              type: 'string',
              description: 'ReorderLevel of the product'
            },
            Discontinued: {
              type: 'string',
              description: 'Discontinued of the product'
            }
          }
        },
        Region: {
          type: 'object',
          description: 'Region entity',
          properties: {
            RegionID: {
              type: 'string',
              description: 'Id of the region',
              example: '1'
            },
            RegionDescription: {
              type: 'string',
              description: 'Description of the region'
            }
          }
        },
        Shipper: {
          type: 'object',
          description: 'Shipper entity',
          properties: {
            ShipperID: {
              type: 'string',
              description: 'Id of the region',
              example: '1'
            },
            CompanyName: {
              type: 'string',
              description: 'CompanyName of the region'
            },
            Phone: {
              type: 'string',
              description: 'Phone of the region'
            }
          }
        },
        Supplier: {
          type: 'object',
          description: 'Supplier entity',
          properties: {
            Id: {
              type: 'string',
              description: 'Id of the supplier',
              example: '1'
            },
            CompanyName: {
              type: 'string',
              description: 'CompanyName of the supplier'
            },
            ContactName: {
              type: 'string',
              description: 'ContactName of the supplier'
            },
            ContactTitle: {
              type: 'string',
              description: 'ContactTitle of the supplier'
            },
            Address: {
              type: 'string',
              description: 'Address of the supplier'
            },
            City: {
              type: 'string',
              description: 'City of the supplier'
            },
            Region: {
              type: 'string',
              description: 'Region of the supplier'
            },
            PostalCode: {
              type: 'string',
              description: 'PostalCode of the supplier'
            },
            Country: {
              type: 'string',
              description: 'Country of the supplier'
            },
            Phone: {
              type: 'string',
              description: 'Phone of the supplier'
            },
            Fax: {
              type: 'string',
              description: 'Fax of the supplier'
            },
            HomePage: {
              type: 'string',
              description: 'HomePage of the supplier'
            }
          }
        },
        Territory: {
          type: 'object',
          description: 'Territories entity',
          properties: {
            TerritoryID: {
              type: 'string',
              description: 'Id of the territory',
              example: '1'
            },
            TerritoryDescription: {
              type: 'string',
              description: 'Description of the territory'
            },
            RegionID: {
              type: 'string',
              description: 'RegionID of the territory'
            }
          }
        },
        User: {
          type: 'object',
          description: 'Users entity',
          properties: {
            Id: {
              type: 'string',
              description: 'Id of the territory',
              example: '1'
            },
            Username: {
              type: 'string',
              description: 'Username of the territory'
            },
            Password: {
              type: 'string',
              description: 'Password of the territory'
            },
            Email: {
              type: 'string',
              description: 'Email of the territory'
            },
            Is_Active: {
              type: 'string',
              description: 'Is_Active of the territory'
            },
            Access_Token: {
              type: 'string',
              description: 'Access_Token of the territory'
            },
            Refresh_Token: {
              type: 'string',
              description: 'Refresh_Token of the territory'
            }
          }
        },
        ErrorSchema: {
          type: 'object',
          description: 'ErrorSchema entity',
          properties: {
            statusCode: {
              type: 'string',
              description: 'The status code',
              example: '500'
            },
            error: {
              type: 'string',
              description: 'The error message'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Category',
        description: 'Everything about your Categories',
        externalDocs: {
          description: 'Find out more',
          url: 'http://swagger.io'
        }
      },
      {
        name: 'Customer',
        description: 'Everything about your Customers',
        externalDocs: {
          description: 'Find out more',
          url: 'http://swagger.io'
        }
      },
      {
        name: 'Employee',
        description: 'Everything about your Employees',
        externalDocs: {
          description: 'Find out more',
          url: 'http://swagger.io'
        }
      },
      {
        name: 'Order Detail',
        description: 'Everything about your Order Details',
        externalDocs: {
          description: 'Find out more',
          url: 'http://swagger.io'
        }
      },
      {
        name: 'Order',
        description: 'Everything about your Orders',
        externalDocs: {
          description: 'Find out more',
          url: 'http://swagger.io'
        }
      },
      {
        name: 'Product',
        description: 'Everything about your Products',
        externalDocs: {
          description: 'Find out more',
          url: 'http://swagger.io'
        }
      },
      {
        name: 'Region',
        description: 'Everything about your Regions',
        externalDocs: {
          description: 'Find out more',
          url: 'http://swagger.io'
        }
      },
      {
        name: 'Shipper',
        description: 'Everything about your Shippers',
        externalDocs: {
          description: 'Find out more',
          url: 'http://swagger.io'
        }
      },
      {
        name: 'Supplier',
        description: 'Everything about your Suppliers',
        externalDocs: {
          description: 'Find out more',
          url: 'http://swagger.io'
        }
      },
      {
        name: 'Territory',
        description: 'Everything about your Territories',
        externalDocs: {
          description: 'Find out more',
          url: 'http://swagger.io'
        }
      },
      {
        name: 'User',
        description: 'Everything about your Users',
        externalDocs: {
          description: 'Find out more',
          url: 'http://swagger.io'
        }
      }
    ]
  },
  apis: []
};

const specs = swaggerJsdoc(options);
app.get('/swagger.json', (req, res): void => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);

module.exports = app;
