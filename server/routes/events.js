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

// GET events
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

// GET events
router.get('/', function(req, res) {
  console.log('GET SUM route hit');
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }
    client.query('SELECT sum(packs_made) FROM events;', function(err, result) {
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
}); // end get

// POST /inventory
router.post('/', function(req, res) {
  console.log('++++++++++++++++{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}');
  console.log(req.body);
  var event_date = req.body.date;
  var event_time = req.body.time;
  var partner = req.body.partner;
  var event_type = req.body.event_type;
  var packs_promised = req.body.packs_promised;
  var packs_made = req.body.packs_made;
  var comments = req.body.comments;
  console.log(event_date);
  // do database query to make a new todo
  pool.connect()
    .then(function(client) {
      console.log('in post db');
      client.query('INSERT INTO events (event_date, event_time, partner_name, event_type, packs_promised, packs_made, comments) VALUES($1, $2, $3, $4, $5, $6, $7)', [event_date, event_time, partner, event_type, packs_promised, packs_made, comments])
        .then(function() {
          console.log('in then post db');
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
}); // end post

router.delete('/:id', function(req, res, next) {
  console.log("delete router connected to database");
  console.log(req.params.id);
  pool.connect(function(err, client, done) {
    var id = req.params.id;
    console.log('post hit', id);
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
    }); // end query
  }); // end pool
}); // end delete

router.put('/:id', function(req, res) {
  console.log('in put db');
  var id = req.body.id;
  console.log(id);
  console.log(req.body);
  var id = req.params.id;
  var event_date = req.body.date;
  var event_time = req.body.time;
  var partner_name = req.body.partner_name;
  var packs_made = req.body.packs_made;
  var packs_promised = req.body.packs_promised;
  var comments = req.body.comments;
  console.log(packs_promised);
  // updates specified field
  pool.connect(function(err, client, done) {
    console.log(id);
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("UPDATE events SET event_date=$1, event_time=$2, partner_name=$3, packs_made=$4, packs_promised=$5, comments=$6 WHERE id = $7;", [event_date, event_time, partner_name, packs_made, packs_promised, comments, id], function(err, result) {
      console.log(id);
      done();
      if (err) {
        return console.error('error running query', err);
      }
      console.log(result);
      res.send(result);
    }); // end query
  }); // end pool
}); // end put

// router.get for getPackTotals
router.get('/neededTotals', function(req, res) {
  console.log('event.js /neededPacks hit');
  pool.connect(function(err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      done();
      return;
    } // end first if statements

    // TOTALS - NEEDED PACKS QUERY   ******  1  *****
    client.query('SELECT (SUM(e.packs_promised) - SUM(e.packs_made)) "packs_needed_total" FROM events e;', function(err, result) {

      var packTotals = {
        needed: '',
        made: '',
        donated: ''
      }; // end packTotals

      if (err) {
        console.log('Error querying the DB for Needed Packs');
        done();
      } else {
        packTotals.needed = parseInt(result.rows[0].packs_needed_total);
        console.log('Got needed packs *1* from the DB:', result.rows[0].needed);

        // TOTALS - PACKS CURRENTLY MADE QUERY   *****  2  *****
        client.query('SELECT SUM (e.packs_made) FROM events e;', function(err1, result1) {
          if (err1) {
            console.log('Error querying the DB for Packs Currently Made:', result1.made);
            done(); // exit out of DB pool
          } else {
            packTotals.made = parseInt(result1.rows[0].sum);
            console.log('Got Packs Currently Made *2* from the DB:', result.rows[0].made);

            // TOTALS - CTD ANNUAL PACKS DONATED QUERY   *****  3  *****
            client.query('SELECT SUM (e.packs_promised) FROM events e WHERE e.event_date <= (current_date);', function(err2, result2) {
              if (err2) {
                console.log('Error querying the DB for CTD Annual Packs Donated *3*');
                done(); // exit out of DB pool
              } else {
                packTotals.donated = parseInt(result2.rows[0].sum);
                console.log('Got CTD Annual Packs Donated *3* from the DB:', result2.rows[0].sum);
              } // end else statement
              res.send(packTotals);
              console.log('packTotals:', packTotals);
            }); // end client.query for 3rd query
          } // end else for 2nd query
        }); // end client.query for 2nd query
      } // end else for 1st client.query
    }); // end else for 1st client.query
  }); // end pool.connect
}); // end router.get for /neededPacks

module.exports = router;
