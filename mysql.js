var mysql = require('mysql')

var pool = mysql.createPool({
    "user":"root",
    "password":"root",
    "database":"Education_project",
    "host":"127.0.0.1",
    "port":3306
});

module.exports = pool;