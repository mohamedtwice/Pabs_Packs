var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
var path = require('path');

// module with db
router.use(bodyParser.urlencoded({
  extended: true
}));
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

// GET /backpack
router.get('/', function(req, res) {
  console.log('get hit');
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

// POST /backpack
router.post('/', function(req, res) {
  console.log('{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}');
  console.log(req.body);
  var goal = req.body.goal;
  var year = req.body.year;
  // do database query to make a new todo
  pool.connect()
    .then(function(client) {
      client.query('INSERT INTO backpack_goal (goal, year) VALUES($1, $2)', [goal, year])
        .then(function() {
          client.release();
          res.sendStatus(201); // created
          done();
        });
    })
    .catch(function(err) {
      client.release();
      res.sendStatus(500); // server error
      done();
    });
});

// POST /backpack
router.put('/:id', function(req, res) {
  console.log('{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]');
  var id = req.body.id;
  var goal = req.body.goalUpdate;
  var year = req.body.yearUpdate;
  console.log(id);
  console.log(goal);
  // updates specified field
  pool.connect()
    .then(function(client) {
      client.query("UPDATE inventory SET goal=$1, year=$2 WHERE id = $3;", [goal, year, id])
        .then(function() {
          client.release();
          res.sendStatus(201); // created
          done();
        });
    })
    .catch(function(err) {
      client.release();
      res.sendStatus(500); // server error
      done();
    });
});
