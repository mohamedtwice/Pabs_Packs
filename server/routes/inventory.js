var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser')
var path = require('path');

// module with db
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

var connection = require('../modules/connection');
var pg = require('pg');

var config = {
  database: 'pabs_packs',
  host: 'localhost',
  port: 5432, // always use this port for localhost postgresql
  max: 12
};
var pool = new pg.Pool(config); // DO NOT MODIFY

// GET /inventory
// Only modify IF you are doing Eye of the Tiger
router.get('/', function(req, res) {
  console.log('get hit');
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }
    client.query('SELECT * FROM inventory;', function(err, result) {
      done();
      if (err) {
        console.log('Error querying the DB', err);
        res.sendStatus(500);
        return;
      }
      console.log('Got rows from the DB:', result.rows);
      res.send(result.rows);
    });
  });
});

// POST /inventory
router.post('/', function(req, res) {
  console.log(req.body);
  var item = req.body.item;
  var vendor = req.body.vendor;
  var comments = req.body.comments;
  var on_hand = req.body.numberOnHand;
  var low_number = req.body.reorderAlertNumber;
  var type = req.body.type;
  // do database query to make a new todo
  pool.connect()
    .then(function(client) {
      client.query('INSERT INTO inventory (item, vendor_id, number_on_hand, comments, low_number, type) VALUES($1, $2, $3, $4, $5, $6)', [item, vendor, on_hand, comments, low_number, type])
        .then(function() {
          client.release();
          res.sendStatus(201); // created
        });
    })
    .catch(function(err) {
      client.release();
      res.sendStatus(500); // server error
    });
});

router.delete('/:id', function(req, res) {
  console.log(req.body);
  var results = [];
  // Grab data from the URL parameters
  var id = req.params.id;
  // Get a Postgres client from the connection pool
  pool.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM inventory WHERE id=($1)', [id]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM items ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

module.exports = router;
