var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

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



module.exports = router;
