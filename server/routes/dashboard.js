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



router.get('/donationData', function(req, res) {
  console.log('dashboard.js /donationData hit');
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      // res.sendStatus(500);
      done();
      return;
    } // end first if statement

    // PACKS ALREADY DONATED QUERY   ********   1   ********
    client.query("SELECT SUM (packs_promised) FROM events WHERE event_date >= date_trunc('year',current_date) AND event_date < (current_date);", function(err, result) {

      var dashboardData = {
        packsDonated: '',
        leftToDonate: '',
        scheduledDonations: ''
      }; // end dashboardData object

      if (err) {
        console.log('Error querying the DB for packs already donated *1*', err);
        done(); // exit out of DB pool
        res.sendStatus(500);
      } else {
        dashboardData.packsDonated = parseInt(result.rows[0].sum);
        console.log('dashboardData.packsDonated:', dashboardData.packsDonated);
        console.log('Got pie chart packs already donated *1* from the DB:', result.rows[0].sum);

        // PACKS LEFT TO DONATE QUERY   ********   2   ********
        client.query("SELECT (bg.annual_goal::int - pp.packs_promised) left_to_donate FROM backpack_goal bg,(SELECT SUM (packs_promised) packs_promised,to_char(event_date,'YYYY') event_date FROM events WHERE event_date >= date_trunc('year',current_date) AND event_date < (current_date) GROUP BY to_char(event_date,'YYYY')) pp WHERE bg.year = pp.event_date;", function(err1, result1) {
          if (err1) {
            console.log('Error querying the DB for packs left to donate *2*', err);
            done(); // exit out of DB pool
            res.sendStatus(500);
          } else {
            dashboardData.leftToDonate = parseInt(result1.rows[0].left_to_donate); // using .left_to_donate due to the SQL query
            console.log('Got pie chart packs left to donate *2* from the DB:', result1.rows[0].left_to_donate);
            // SCHEDULED PACK DONATIONS QUERY   ********   3   ********
            client.query("SELECT SUM (packs_promised) FROM events WHERE event_date >=  NOW();", function(err2, result2) {
              if (err1) {
                console.log('Error querying the DB for scheduled pack donations *3*', err2);
                done(); // exit out of DB pool
                res.sendStatus(500);
              } else {
                dashboardData.scheduledDonations = parseInt(result2.rows[0].sum);
                console.log('Got pie chart scheduled pack donations *3* from the DB:', result2.rows[0].sum);
              } // end else statement
              res.send(dashboardData);
              console.log('dashboardData:', dashboardData);
            }); // end 3rd client.query
          } // end else statement for 2nd query
        }); // end 2nd client.query
      } // end else for 1st client.query
    }); // end 1st client.query
  }); // end pool.connect
}); // end router.get for /donationData





router.get('/inventoryData', function(req, res) {
  console.log('dashboard.js /inventoryData hit');
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      // res.sendStatus(500);
      done();
      return;
    } // end first if statement

    // ITEMS RUNNING LOW - ITEMS QUERY   ********   1   ********
    client.query('SELECT item FROM inventory WHERE low_number >= number_on_hand;', function(err, result) {

      var inventoryData = {
        items: '',
        numbers: ''
      }; // end inventory Data object

      if (err) {
        console.log('Error querying the DB for bar chart items running low');
        done(); // exit out of DB pool
      } else {
        inventoryData.items = result;
        console.log('Got bar chart inventory barLabels *1* from the DB:', result.rows[0].items);

        // ITEMS RUNNING LOW - NUMBERS QUERY   ********   2   ********
        client.query('SELECT number_on_hand FROM inventory WHERE low_number >= number_on_hand;', function(err1, result1) {
          if (err) {
            console.log('Error querying the DB for bar chart numbers running low', err);
            done(); // exit out of DB pool
          } // end if statement
          inventoryData.numbers = result1;
          console.log('Got bar chart inventory barData *2* from the DB:', result1.rows[0].numbers);
          res.send(inventoryData);
          console.log('inventoryData:', inventoryData);
        }); // end 2nd client.query for barData
      } // end else
    }); // end 1st client.query for barLabels
  }); // end pool.connect
}); // end router.get for /inventoryData




router.get('/upcomingEvents', function(req, res) {
  console.log('dashboard.js /upcomingEvents hit');
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connection to the DB for /upcomingEvents', err);
      done();
      return;
    }
    client.query("SELECT * FROM events WHERE event_date >= (current_date) ORDER BY event_date FETCH FIRST 5 ROWS ONLY;", function(err, result) {
      done();
      if (err) {
        console.log('Error querying the DB for upcoming events', err);
        return;
      }
      console.log('Got upcoming events from the DB:', result.rows);
      res.send(result.rows);
    }); // end client.query
  }); // end pool.connect
}); // end router.get for /upcomingEvents

module.exports = router;
