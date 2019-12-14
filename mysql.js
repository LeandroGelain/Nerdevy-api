var mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

var pool = mysql.createPool({
    "user":process.env.USER,
    "password":process.env.PASSWORD,
    "database":process.env.DATABASE,
    "host":process.env.HOST,
    "port":3306
});

module.exports = pool;