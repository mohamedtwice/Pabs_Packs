// var express = require('express');
// var router = express.Router();
// var passport = require('passport');
// // var Users = require('../models/user');
// var path = require('path');
//
// // module with db
// var connection = require('../modules/connection');
// var pg = require('pg');
//
// var pool = new pg.Pool(config); // DO NOT MODIFY
//
// // GET /inventory
// // Only modify IF you are doing Eye of the Tiger
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
//
// /** ---- PUT YOUR CODE BELOW ---- **/
//
// // POST /inventory
// router.post('/', function(req, res) {
//   var inventory = req.body; // data from the client
//
//   // do database query to make a new todo
//   pool.connect()
//     .then(function(client) {
//       client.query('INSERT INTO inventory (item, vendor_id, onhand, lownumber, notes) VALUES($1, $2, $3, $4, $5)', [req.body.item, req.body.vendor_id, req.onhand, req.lownumber, req.notes])
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
// // PUT /inventory/<id>
// // router.put('/:id', function(req, res) {
// //   var completed = req.body;
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
//
// /** ---- DO NOT MODIFY BELOW ---- **/
// module.exports = router;
