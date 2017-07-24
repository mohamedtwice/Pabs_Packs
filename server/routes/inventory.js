var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// module with db
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
  var vendor_id = req.body.vendor;
  var on_hand = req.body.number_on_hand;
  var low_number = req.body.low_number;
  var type = req.body.type;
  // do database query to make a new todo
  pool.connect()
    .then(function(client) {
      client.query('INSERT INTO inventory (item, vendor, number_on_hand, low_number, type) VALUES($1, $2, $3, $4, $5)', [item, vendor, on_hand, low_number, type])
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

module.exports = router;
