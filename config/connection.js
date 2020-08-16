const mysql = require("mysql");

// Set up our connection information

if (process.env.JAWSDB_URL) {
    connection - mysql.createConnection(process.env.JAWSDB_URL);
} else {
    const connection = mysql.createConnection({
        port: 3306,
        host: "localhost",
        user: "root",
        password: "",
        database: "burgers_db"
    });

    // Connect to the database
    connection.connect((err) => {
        if (err) {
            console.error("error connecting: " + err.stack);
            return;
        }
        console.log("connected as id " + connection.threadId);
    });

    // Export connection
    module.exports = connection;