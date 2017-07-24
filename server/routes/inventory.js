var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
// var Users = require('../models/user');
// var path = require('path');
var pg = require('pg');

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

// // module with db
var encryptLib = require('../modules/encryption');
// var connection = require('../modules/connection');


// Handles request for HTML file
// router.get('/', function(req, res, next) {
//   res.sendFile(path.resolve(__dirname, '../public/views/inventory.html'));
// });
//
var config = {
  database: 'grouptest',
  host: 'localhost',
  port: 5432, // default port for localhost postgres databases
  max: 20
};
var pool = new pg.Pool(config);


// router.get('/inventory', function(req, res) {
//   console.log(req.body);
//   // START connect to dB
//   pool.connect(function(err, connection, done) {
//     if (err) {
//       done();
//       res.send(400);
//     } else {
//       // START select query syntax
//       connection.query("SELECT * FROM inventory ORDER BY id ASC;");
//       // END select query syntax
//       done();
//       res.sendStatus(201);
//     } // END select for owner/pet history
//   }) // END pool.connect
// })


// Handles POST request with new user data
router.post('/', function(req, res) {
  console.log('in post router');
  console.log(req.body);
  // var saveItem = {
  //   item: req.body.item,
  //   vendor_id: req.body.vendor_id,
  //   onhand: req.body.onhand,
  //   lownumber: req.body.lownumber,
  //   type: req.body.type,
  //   notes: req.body.notes
  // };
  console.log('new item:', saveItem);

  pool.connect(connection, function(err, client, done) {
    if (err) {
      console.log("Error connecting: ", err);
      next(err);
    }
    client.query("INSERT INTO inventory (item, vendor_id, onhand, lownumber, type, notes) VALUES ('" + item + "', '" + vendor_id + "', '" + onhand + "', '" + lownumber + "', '" + type + "', '" + notes + "') RETURNING id", [saveUser.username, saveUser.password],
      function(err, result) {
        client.end();

        if (err) {
          console.log("Error inserting data: ", err);
          next(err);
        } else {
          res.redirect('/');
        }
      });
  });


});


// add item
// router.post('/', function(req, res) {
//   // START connect to dB
//   pool.connect(function(err, connection, done) {
//     if (err) {
//       done();
//       res.sendStatus(400);
//     } else {
//       console.log(data);
//       var item = data.item;
//       var vendor_id = data.vendor_id;
//       var onhand = data.onhand;
//       var lownumber = data.lownumber;
//       var type = data.type;
//       var notes = data.notes;
//       connection.query("INSERT INTO inventory (item, vendor_id, onhand, lownumber, type, notes) VALUES ('" + item + "', '" + vendor_id + "', '" + onhand + "', '" + lownumber + "', '" + type + "', '" + notes + "');");
//       done();
//       res.sendStatus(201);
//     }
//   });
// });


// router.post('/', function(req, res, next) {
//   // var results = [];
//   // Grab data from http request
//   var data = {
//     item: data.item,
//     vendor_id: data.vendor_id,
//     onhand: data.onhand,
//     lownumber: data.lownumber,
//     type: data.type,
//     notes: data.notes
//   };
//
//   console.log('new item:', data);
//
//   // Get a Postgres client from the connection pool
//   pg.connect(connection, function(err, client, done) {
//     // Handle connection errors
//     if (err) {
//       done();
//       console.log(err);
//       return res.status(500).json({
//         success: false,
//         data: err
//       });
//     }
//     // SQL Query > Insert Data
//     client.query("INSERT INTO inventory(item, vendor_id, onhand, lownumber, type, notes) VALUES($1, $2, $3, $4, $5, $6)", [data.item, data.vendor_id, data.onhand, data.lownumber, data.type, data.notes]),
//       function(err, result) {
//         client.end();
//
//         if (err) {
//           console.log("Error inserting data: ", err);
//           next(err);
//         } else {
//           res.redirect('/');
//         }
//       };
//     // client.query('INSERT INTO items(text, complete) values($1, $2)', [data.text, data.complete]);
//     // SQL Query > Select Data
//     // var query = client.query('SELECT * FROM inventory ORDER BY id ASC');
//     // Stream results back one row at a time
//     // query.on('row', function(row) {
//     //   results.push(row);
//     // });
//     // After all data is returned, close connection and return results
//     // query.on('end', function() {
//     //   done();
//     //   return res.json(results);
//     // });
//
//   });
// });

// --------------------------

// router.get('/inventory', function(req, res, next) {
//   var results = [];
//   // Get a Postgres client from the connection pool
//   pg.connect(connection, function(err, client, done) {
//     // Handle connection errors
//     if (err) {
//       done();
//       console.log(err);
//       return res.status(500).json({
//         success: false,
//         data: err
//       });
//     }
//     // SQL Query > Select Data
//     var query = client.query('SELECT * FROM inventory ORDER BY id ASC;');
//     // Stream results back one row at a time
//     query.on('row', function(row) {
//       results.push(row);
//     });
//     // After all data is returned, close connection and return results
//     query.on('end', function() {
//       done();
//       return res.json(results);
//     });
//   });
// });

// router.post('/', function(req, res) {
//   var treats = data; // data from the client
//
//   // do database query to make a new todo
//   pool.connect()
//     .then(function(client) {
//       client.query('INSERT INTO inventory (item, vendor_id, onhand, lownumber, type, notes) VALUES($1, $2, $3, $4, $5, $6)', [data.item, data.vendor_id, req.onhand, req.lownumber, req.type, req.notes])
//         .then(function() {
//           client.release();
//           res.sendStatus(201); // created
//         });
//     })
//     .catch(function(err) {
//       client.release();
//       res.sendStatus(500); // server error
//     });
// });
//
//
// router.get('/', function(req, res) {
//   pool.connect(function(err, client, done) {
//     if (err) {
//       console.log('Error connecting to the DB', err);
//       res.sendStatus(500);
//       done();
//       return;
//     }
//
//     client.query('SELECT * FROM inventory;', function(err, result) {
//       done();
//       if (err) {
//         console.log('Error querying the DB', err);
//         res.sendStatus(500);
//         return;
//       }
//
//       console.log('Got rows from the DB:', result.rows);
//       res.send(result.rows);
//     });
//   });
// });

// --------------------------

// var pool = new pg.Pool(config); // DO NOT MODIFY

// GET /inventory
// Only modify IF you are doing Eye of the Tiger
// router.get('/', function(req, res) {
//   pool.connect(function(err, client, done) {
//     if (err) {
//       console.log('Error connecting to the DB', err);
//       res.sendStatus(500);
//       done();
//       return;
//     }
//
//     client.query('SELECT * FROM inventory;', function(err, result) {
//       done();
//       if (err) {
//         console.log('Error querying the DB', err);
//         res.sendStatus(500);
//         return;
//       }
//
//       console.log('Got rows from the DB:', result.rows);
//       res.send(result.rows);
//     });
//   });
// });

// // POST /inventory
// router.post('/', function(req, res) {
//   var inventory = data; // data from the client
//
//   // do database query to make a new todo
//   pool.connect()
//     .then(function(client) {
//       client.query('INSERT INTO inventory (item, vendor_id, onhand, lownumber, type, notes) VALUES($1, $2, $3, $4, $5, $6)', [data.item, data.vendor_id, req.onhand, req.lownumber, req.type, req.notes])
//         .then(function() {
//           client.release();
//           res.sendStatus(201); // created
//         });
//     })
//     .catch(function(err) {
//       client.release();
//       res.sendStatus(500); // server error
//     });
// });

// // PUT /inventory/<id>
// // router.put('/:id', function(req, res) {
// //   var completed = data;
// //   console.log('received completed from client', completed);
// //
// //   var id = req.params.id;
// //
// //   pool.connect()
// //     .then(function(client) {
// //       client.query('UPDATE inventory ' +
// //           'SET description = $1 ' +
// //           'WHERE id = $2', [completed.description, id])
// //         .then(function() {
// //           client.release();
// //           res.sendStatus(204); // something good
// //         });
// //     })
// //     .catch(function(err) {
// //       client.release();
// //       res.sendStatus(500); // server error
// //     });
// // });
//
// // DELETE /inventory/<id>
// // router.delete('/:id', function(req, res) {
// //   var id = req.params.id;
// //
// //   pool.connect()
// //     .then(function(client) {
// //       client.query('DELETE FROM inventory ' +
// //           'WHERE id = $1', [id])
// //         .then(function() {
// //           client.release();
// //           res.sendStatus(204); // something good
// //         });
// //     })
// //     .catch(function(err) {
// //       client.release();
// //       res.sendStatus(500); // server error
// //     });
// // });


// --------------------------


// // Handles POST request with new user data
// router.post('/', function(req, res, next) {
//
//   var saveItem = {
//     item: data.item,
//     vendor_id: data.vendor_id,
//     onhand: data.onhand,
//     lownumber: data.lownumber,
//     type: data.type,
//     notes: data.notes
//   };
//   console.log('new item:', saveItem);
//
//   pg.connect(connection, function(err, client, done) {
//     if (err) {
//       console.log("Error connecting: ", err);
//       next(err);
//     }
//     client.query('INSERT INTO inventory (item, vendor_id, onhand, lownumber, type, notes) VALUES($1, $2, $3, $4, $5, $6)', [saveItem.item, saveItem.vendor_id, saveItem.onhand, saveItem.lownumber, saveItem.type, saveItem.notes]),
//       function(err, result) {
//         client.end();
//         if (err) {
//           console.log("Error inserting data: ", err);
//           next(err);
//         } else {
//           res.redirect('/');
//         }
//       };
//   });
//
// });


// /** ---- DO NOT MODIFY BELOW ---- **/
module.exports = router;
