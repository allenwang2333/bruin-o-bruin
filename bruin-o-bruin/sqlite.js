/*
    Handles the request of database query
    @param {string} table - the table name
    @author Allen Wang
    @date Nov 8 2022
*/

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


// Read all info from the table
// However, This function is synchronous. It's weird.
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

// return user name and passed for table
function readTableByUsernames(table, username, callback) {
    var queryString = 
        "SELECT * FROM " + table + 
        " WHERE username == \"" + username + "\"";
    let userInfo = {}; 
    db.all(queryString, (err, rows) => {
        if (err) throw err;
        rows.forEach(function (row) {
            userInfo[schema[table][1]] = row[schema[table][1]];
            userInfo[schema[table][2]] = row[schema[table][2]];
        });
        callback(userInfo);
    });
}

function addUser(table, username, passwd, callback) {
        var testExist = 
        "SELECT * FROM " + table + 
        " WHERE username == \"" + username + "\"";
        var queryString = 
        "INSERT INTO " + table + 
        " (username, passwd) VALUES (\"" + username + "\", \"" + passwd + "\") ";
        var flag = false;
        db.all(testExist, (err, rows) => {
            if (err) throw err;
            if (rows.length > 0) {
                flag = false;
                console.log("User \"" + username + "\" already exists");
                return;
            }
            else {
                db.run(queryString, (err) => {
                    if (err) throw err;
                    callback(username);            
                }); 
            }
        });        
}

function print(data) {
    console.log(data);
}

readTableAll("users", print);
//readTableByUsernames("users", "allen", print);
addUser("users", "jack", "313", print);

db.close();
console.log("Database connection closed");