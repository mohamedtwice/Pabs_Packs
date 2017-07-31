var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser')
var path = require('path');

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());


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
router.get('/', function(req, res) {
  console.log('get partners hit');
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }
    client.query('SELECT * FROM partners;', function(err, result) {
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
  var name = req.body.name;
  var address = req.body.address;
  var phone_number = req.body.phoneNumber;
  var comments = req.body.comments;
  var contact = req.body.contact;
  // do database query to make a new todo
  pool.connect()
    .then(function(client) {
      client.query('INSERT INTO partners (name, address, phone_number, comments, contact_name) VALUES($1, $2, $3, $4, $5)', [name, address, phone_number, comments, contact_name])
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







module.exports = router;
