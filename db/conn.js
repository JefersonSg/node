const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: '34.173.171.235',
  port: '3306',
  user: 'root',
  password: '',
  database: 'nodesql',
});

module.exports = pool;
