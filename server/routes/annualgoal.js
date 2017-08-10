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
  console.log('getAnnualgoal route hit');
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }
    client.query('SELECT * FROM backpack_goal;', function(err, result) {
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

// POST annual_goal
router.post('/', function(req, res) {
  console.log(req.body);
  var year = req.body.year;
  var annual_goal = req.body.annual_goal;

  // do database query to make a new todo
  pool.connect()
    .then(function(client) {
      console.log('in post db');
      client.query('INSERT INTO backpack_goal (year, annual_goal) VALUES($1, $2)', [year, annual_goal])
        .then(function() {
          console.log('in then post annual_goal db');
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

router.put('/:id', function(req, res) {
  console.log('{{{{{{{{{{{{{{{{{{{ PUT PUT PUT PUT PUT  }}}}}}}}}}}}}}}}}}}[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]');
  console.log(req.body);
  var id = req.params.id;
  var goal = req.body.annual_goalUpdate;
  var year = req.body.yearUpdate;
  // updates specified field
  pool.connect(function(err, client, done) {
    console.log(id);
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("UPDATE backpack_goal SET annual_goal=$1, year=$2 WHERE id = $3;", [goal, year, id], function(err, result) {
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

module.exports = router;
