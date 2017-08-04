var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var bodyParser = require('body-parser');

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

// GET vendors
router.get('/', function(req, res) {
  console.log('getVendors route hit');
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }
    client.query('SELECT * FROM vendors;', function(err, result) {
      done();
      if (err) {
        console.log('Error querying the DB', err);
        res.sendStatus(500);
        return;
      }
      console.log('Got rows from the DB:', result.rows);
      res.send(result.rows);
    }); // end query
  }); // end connect
}); // end get

// POST newVendor
router.post('/', function(req, res) {
  console.log(req.body);
  var name = req.body.vendor_name;
  var phone = req.body.vendor_phone;
  var email = req.body.vendor_email;
  var address = req.body.vendor_address;
  // do database query to create a new vendor
  pool.connect()
    .then(function(client) {
      console.log('in post db');
      client.query('INSERT INTO vendors (vendor_name, vendor_phone, vendor_email, vendor_address) VALUES($1, $2, $3, $4)', [name, phone, email, address])
        .then(function() {
          console.log('in then post vendors db');
          client.release();
          res.sendStatus(201); // created
          done();
        });
    }) // end then
    .catch(function(err) {
      console.log('in err db');
      client.release();
      res.sendStatus(500); // server error
      done();
    });
});

router.put('/:id', function(req, res) {
  console.log('{{{{{{{{{{{{{{{{{{{ PUT PUT PUT PUT PUT  }}}}}}}}}}}}}}}}}}}[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]');
  console.log(req.body);
  var id = req.params.id;
  var vendor_name = req.body.vendor_name;
  var vendor_email = req.body.vendor_email;
  var vendor_phone = req.body.vendor_phone;
  var vendor_address = req.body.vendor_address;
  // updates specified field
  pool.connect(function(err, client, done) {
    console.log(id);
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("UPDATE vendors SET vendor_name=$1, vendor_phone=$2, vendor_email=$3, vendor_address=$4 WHERE id = $5;", [vendor_name, vendor_phone, vendor_email, vendor_address, id], function(err, result) {
      console.log(id);
      done();
      if (err) {
        return console.error('error running query', err);
      }
      console.log(result);
      res.send(result);
    }); // end query
  }); // end connect
}); // end put

router.delete('/:id', function(req, res, next) {
  console.log("delete router connected to database");
  console.log(req.params.id);
  pool.connect(function(err, client, done) {
    var id = req.params.id;
    console.log('post hit', id);
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('DELETE FROM vendors WHERE id = $1', [id], function(err, result) {
      console.log(id);
      done();
      if (err) {
        return console.error('error running query', err);
      }
      console.log(result);
      res.send(result);
    }); // end query
  }); // end connect
}); // end delete

module.exports = router;
