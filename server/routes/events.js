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

// GET /inventory
// Only modify IF you are doing Eye of the Tiger
router.get('/', function(req, res) {
  console.log('getEvents route hit');
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }
    client.query('SELECT * FROM events;', function(err, result) {
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


// -------


// POST /inventory
router.post('/', function(req, res) {
  console.log(req.body);
  var event_date = req.body.event_date;
  var event_time = req.body.event_time;
  var partner_id = req.body.partner_id;
  var event_type = req.body.event_type;
  var packs_promised = req.body.packs_promised;
  var packs_made = req.body.packs_made;
  var comments = req.body.comments;

  // do database query to make a new todo
  pool.connect()
    .then(function(client) {
      console.log('in post db');
      client.query('INSERT INTO events (event_date, event_time, partner_id, event_type, packs_promised, packs_made, comments) VALUES($1, $2, $3, $4, $5, $6, $7)', [event_date, event_time, partner_id, event_type, packs_promised, packs_made, comments])
        .then(function() {
          console.log('in then post db');
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

// ---

router.delete('/:id', function(req, res, next) {
  console.log("delete router connected to database");

  pool.connect(function(err, client, done) {
    var id = req.params.id;
    console.log(id);
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('DELETE FROM events WHERE id = $1', [id], function(err, result) {
      console.log(id);
      done();
      if (err) {
        return console.error('error running query', err);
      }
      console.log(result);
      res.send(result);
    });
  });
});


// ---

router.put('/:id', function(req, res, next) {
  console.log('in put db');
  var id = req.params.id;
  console.log(id);
  console.log(req.body);
  var event_date = req.body.date;
  var event_time = req.body.time;
  var partner_id = req.body.partner_id;
  var packs_made = req.body.packs_made;
  var packs_promised = req.body.packs_promised;
  var comments = req.body.comments;
  console.log(packs_promised);

  // updates specified field
  pool.connect(function(err, client, done) {
    var id = req.params.id;

    console.log(id);
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("UPDATE events SET event_date=$1, event_time=$2, partner_id=$3, packs_made=$4, packs_promised=$5, comments=$6 WHERE id = $7;", [event_date, event_time, partner_id, packs_made, packs_promised, comments, id], function(err, result) {
      console.log(id);
      done();
      if (err) {
        return console.error('error running query', err);
      }
      console.log(result);
      res.send(result);
    });
  });
  //     .then(function() {
  //       client.release();
  //       res.sendStatus(201); // created
  //     });
  // })
  // .catch(function(err) {
  //   client.release();
  //   res.sendStatus(500); // server error
  // });

});


module.exports = router;
