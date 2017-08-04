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



// GET annualgoal
router.get('/', function(req, res) {
  console.log('getEventType route hit');
  if(req.isAuthenticated()) {
      // send back user object from database
      res.send(req.user);
  } else {
      // failure best handled on the server. do redirect here.
      res.send(false);
  }
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }
    client.query('SELECT * FROM event_type;', function(err, result) {
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


// POST event_type
router.post('/', function(req, res) {
  console.log(req.body);
  var event_type_name = req.body.event_type_name;
  if(req.isAuthenticated()) {
      // send back user object from database
      res.send(req.user);
  } else {
      // failure best handled on the server. do redirect here.
      res.send(false);
  }
  // do database query to make a new todo
  pool.connect()
    .then(function(client) {
      console.log('in post db');
      client.query('INSERT INTO event_type (event_type_name) VALUES($1)', [event_type_name])
        .then(function() {
          console.log('in then post event_type db');
          client.release();
          res.sendStatus(201); // created
          done();
        });
    })
    .catch(function(err) {
      console.log('in err db');
      client.release();
      res.sendStatus(500); // server error
      done();
    });
});





module.exports = router;
