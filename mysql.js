var mysql = require('mysql')

var pool = mysql.createPool({
    "user":"root",
    "password":"root",
    "database":"Education_project",
    "host":"localhost",
    "port":3306
});

module.exports = pool;