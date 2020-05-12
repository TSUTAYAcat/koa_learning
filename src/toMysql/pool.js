var mysql = require('mysql');
var config = require('../../config.js')
// 连接池
var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
});

module.exports = pool