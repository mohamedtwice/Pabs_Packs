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

var firstOfTheYear = new Date(new Date().getFullYear(), 0, 1);

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

// SELECT * FROM accounts where insertdate BETWEEN
// date_trunc('year', now()) AND CURRENT_TIMESTAMP

router.get('/donationData', function(req, res) {
  console.log('dashboard.js get hit');
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      // res.sendStatus(500);
      done();
      return;
    }
    client.query('SELECT SUM (packs_promised) FROM events WHERE event_date <=  NOW();', function(err, result) {
      // firstOfTheYear AND event_date <=
      done();
      if (err) {
        console.log('Error querying the DB for pie chart', err);
        // res.sendStatus(500);
        return;
      }
      console.log('Got pie chart rows from the DB:', result.rows);
      res.send(result.rows);
    });  // end client.query
  }); // end pool.connect
  // res.sendStatus(200);
}); // end router.get



module.exports = router;
