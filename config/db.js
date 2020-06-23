const mysql = require("mysql")

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sgcu_test"
  });


module.exports = con;