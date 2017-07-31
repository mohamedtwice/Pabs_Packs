var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
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
    client.query('SELECT * FROM vendor;', function(err, result) {
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

// POST newVendor
router.post('/', function(req, res) {
  console.log(req.body);
  var vendor_name = req.body.vendor_name;
  var vendor_phone = req.body.vendor_phone;
  var vendor_email = req.body.vendor_email;
  var vendor_address = req.body.vendor_address;
  // do database query to make a new todo
  pool.connect()
    .then(function(client) {
      console.log('in post db');
      client.query('INSERT INTO vendor (vendor_name, vendor_phone, vendor_email, vendor_address) VALUES($1, $2, $3, $4)', [vendor_name, vendor_phone, vendor_email, vendor_address])
        .then(function() {
          console.log('in then post vendors db');
          client.release();
          res.sendStatus(201); // created
        });
    })
    .catch(function(err) {
      console.log('in err db');
      client.release();
      res.sendStatus(500); // server error
    });
});

module.exports = router;
