const pgp = require('pg-promise')();
const connectionString = "postgres://localhost:5432/stock_exchange"
const db = pgp(connectionString);

module.exports = db