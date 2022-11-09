const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/db.sqlite', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});

var schema = {
    "users": ["id", "username", "passwd"]
};

/* 
    Read all info from the table
    However, This function is synchronous. It's weird.
    Author: Allen Wang Nov 8 2022
*/
function readTableAll(table, callback) {
    var queryString = "SELECT * FROM " + table;
    let data = {};
    db.all(queryString, (err, rows) => {
        if (err) throw err;
        rows.forEach(function (row) {
            data[row.id] = {};
            for (var i = 0; i < schema[table].length; i++) {
                data[row.id][schema[table][i]] = row[schema[table][i]];
            }
        });
        callback(data);
    });
    return data;
}

function print(data) {
    console.log(data);
}

readTableAll("users", print);

db.close();
console.log("Database connection closed");