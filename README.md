# SQL Strategy Branch
Branched from `master`. The main difference is it now uses `/strategies/user_sql.js` and all of the MongoDB code has been refactored to us `pg`, as we are using PostGRES as the database.

The `bcrypt` functionality remains intact but now runs synchronously and is not tied to the database model at all.


## Getting Started
Download and run `npm install`

1. See `/modules/connection.js` to set your PostGRES DB connection string.
  - You will find a basic `CREATE TABLE` query commented out in the strategy file.
2. You'll need the `pg` module as well (just run `npm install`)
3. Strategy file is now `/strategies/user_sql.js`. You can ignore `/strategies/user.js`
4. `/models/user.js` is no longer needed at all.
