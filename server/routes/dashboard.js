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
    } // end first if statement

    // PACKS ALREADY DONATED QUERY   ********   1   ********
    client.query('SELECT SUM (packs_promised) FROM events WHERE event_date >= date_trunc("year",current_date) AND event_date < (current_date);', function(err, result) {

      var dashboardData = {}; // end dashboardData object

      if (err) {
        console.log('Error querying the DB for pie chart', err);
        done(); // exit out of DB pool
        res.sendStatus(500);
      } else {
        dashboardData.packsDonated = result.sum;
        console.log('Got pie chart packs donated rows from the DB:', dashboardData);

        // PACKS LEFT TO DONATE QUERY   ********   2   ********
        client.query('SELECT (bg.annual_goal::int - pp.packs_promised) left_to_donate FROM backpack_goal bg,(SELECT SUM (packs_promised) packs_promised,to_char(event_date,"YYYY") event_date FROM events WHERE event_date >= date_trunc("year",current_date) AND event_date < (current_date) GROUP BY to_char(event_date,"YYYY")) pp WHERE bg.year = pp.event_date;', function(err1, result1) {
          if (err1) {
            console.log('Error querying the DB for pie chart', err);
            done(); // exit out of DB pool
            res.sendStatus(500);
          } else {
            dashboardData.scheduledDonations = result1.sum;
            console.log('Got pie chart packs donated rows from the DB:', dashboardData);

            // SCHEDULED PACK DONATIONS QUERY   ********   3   ********
            client.query('SELECT SUM (packs_promised) FROM events WHERE event_date >=  NOW();', function(err2, result2) {
              if (err1) {
                console.log('Error querying the DB for pie chart', err2);
                done(); // exit out of DB pool
                res.sendStatus(500);
              } else {
                dashboardData.scheduledDonations = result2.sum;
                console.log('Got pie chart scheduled donations rows from the DB:', result2.sum);
              } // end second if statement
              res.send(dashboardData);
            }); // end 3rd client.query
          } // end else statement for 2nd query
        }); // end 2nd client.query
      } // end else for 1st client.query
    }); // end 1st client.query
  }); // end pool.connect
}); // end router.get for donationData





router.get('/inventoryData', function(req, res) {
  console.log('dashboard.js get hit');
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      // res.sendStatus(500);
      done();
      return;
    } // end first if statement
    client.query('SELECT item FROM inventory WHERE low_number >= number_on_hand;', function(err, result) {
      done();
      if (err) {
        console.log('Error querying the DB for bar chart');
        return;
      }
      console.log('Got bar chart inventory barLabels from the DB');
    }); // end client.query for barLabels
    client.query('SELECT number_on_hand FROM inventory WHERE low_number >= number_on_hand;', function(err, result) {
      done();
      if (err) {
        console.log('Error querying the DB for bar chart', err);
        // res.sendStatus(500);
        return;
      } // end second if statement
      console.log('Got bar chart inventory barData rows from the DB:', result.rows);
      res.send(result.rows);
    }); // end client.query for barData
  }); // end pool.connect
}); // end router.get for inventoryData

module.exports = router;
