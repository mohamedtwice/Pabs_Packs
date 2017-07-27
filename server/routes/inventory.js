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
  console.log('{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}');
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

// POST /inventory
router.put('/:id', function(req, res) {
  console.log('{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]');
  var id = req.body.id;
  var item = req.body.itemUpdate;
  var vendor = req.body.vendorUpdate;
  var comments = req.body.commentsUpdate;
  var on_hand = req.body.numberOnHandUpdate;
  var low_number = req.body.reorderAlertNumberUpdate;
  console.log(id);
  console.log(item);
  // updates specified field
  pool.connect()
    .then(function(client) {
      client.query("UPDATE inventory SET item=$1, vendor_id=$2, number_on_hand=$3, comments=$4, low_number=$5 WHERE id = $6;", [item, vendor, on_hand, comments, low_number, id])
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
  console.log('-------------------------++++++++++++++++++++++++');
  console.log(req.params.id);
  pool.connect(function(err, connection, done) {
    console.log('Post hit');
    var id = req.params.id;
    if (err) {
      console.log('error in connection', err);
      done();
      res.send(400);
    } else {
      connection.query("DELETE FROM inventory WHERE id = '" + id + "';");
      res.send('deleted');
    }
  });
});

module.exports = router;
