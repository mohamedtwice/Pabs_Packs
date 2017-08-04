var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser')
var path = require('path');

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

// GET /partners
router.get('/', function(req, res) {
  console.log('get partners hit');
  console.log('checking user route ');
  // authenticate route
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
    client.query('SELECT * FROM partners;', function(err, result) {
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

// POST /partners
router.post('/', function(req, res) {
  console.log('{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}');
  console.log(req.body);
  var partner_name = req.body.partner_name;
  var partner_contact = req.body.partner_contact;
  var partner_phone = req.body.partner_phone;
  var partner_address = req.body.partner_address;
  console.log('checking user route ');
  // authenticate route
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
      client.query('INSERT INTO partners (partner_name, partner_contact, partner_phone, partner_address) VALUES($1, $2, $3, $4)', [partner_name, partner_contact, partner_phone, partner_address])
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

// POST /partners
router.put('/:id', function(req, res) {
  console.log('{{{{{{{{{{{{{{{{{{{ PUT PUT PUT PUT PUT  }}}}}}}}}}}}}}}}}}}[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]');
  console.log(req.body);
  console.log(req.params.id);
  var id = req.params.id;
  var partner_name = req.body.partner_name;
  var partner_contact = req.body.partner_contact;
  var partner_phone = req.body.partner_phone;
  var partner_address = req.body.partner_address;
  console.log('checking user route ');
  // authenticate route
  if(req.isAuthenticated()) {
      // send back user object from database
      res.send(req.user);
  } else {
      // failure best handled on the server. do redirect here.
      res.send(false);
  }
  // updates specified field
  pool.connect(function(err, client, done) {
    console.log(id);
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("UPDATE partners SET partner_name=$1, partner_contact=$2, partner_phone=$3, partner_address=$4 WHERE id = $5;", [partner_name, partner_contact, partner_phone, partner_address, id], function(err, result) {
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

router.delete('/:id', function(req, res, next) {
  console.log("delete router connected to database");
  console.log(req.params.id);
  console.log('checking user route ');
  // authenticate route
  if(req.isAuthenticated()) {
      // send back user object from database
      res.send(req.user);
  } else {
      // failure best handled on the server. do redirect here.
      res.send(false);
  }
  pool.connect(function(err, client, done) {
    var id = req.params.id;
    console.log('post hit', id);
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('DELETE FROM partners WHERE id = $1', [id], function(err, result) {
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

module.exports = router;
