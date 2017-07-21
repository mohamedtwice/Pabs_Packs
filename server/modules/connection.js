// connection.js
var connectionString = '';

if (process.env.DATABASE_URL != undefined) {
  connectionString = process.env.DATABASE_URL + "?ssl=true";
} else {
  var connectionString = {
    database: 'pabs_packs',
    host: 'localhost',
    port: 5432, // default port for localhost postgres databases
    max: 20
  };
}

module.exports = connectionString;
