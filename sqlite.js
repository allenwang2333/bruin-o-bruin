/*
    Handles the request of database query
    @author Allen Wang
    @date Nov 8 2022
*/

const sqlite3 = require('sqlite3').verbose();

var schema = {
    "users": ["id", "username", "passwd"]
};

class QueryDatabase {
    constructor(filePath, schema) {
        this.filePath = filePath;
        this.schema = schema;
    }  

    connectDatabase() {
        this.db = new sqlite3.Database(this.filePath, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("-------- Connected to " + this.filePath + " database --------");
        });
    }

    readTableAll(table, callback) {
        var queryString = "SELECT * FROM " + table;
        let data = {};
        this.db.all(queryString, (err, rows) => {
            if (err) throw err;
            rows.forEach(function (row) {
                data[row.username] = {};
                for (var i = 0; i < schema[table].length; i++) {
                    data[row.username][schema[table][i]] = row[schema[table][i]];
                }
            });
            callback(data);
        });
        return data;
    }

    readTableByUsernames(table, username, callback) {
        var queryString = 
            "SELECT * FROM " + table + 
            " WHERE username == \"" + username + "\"";
        let userInfo = {}; 
        this.db.all(queryString, (err, rows) => {
            if (err) throw err;
            rows.forEach(function (row) {
                userInfo[schema[table][1]] = row[schema[table][1]];
                userInfo[schema[table][2]] = row[schema[table][2]];
            });
            callback(userInfo);
        });
    }

    addUser(table, username, passwd, callback) {
        var testExist = 
        "SELECT * FROM " + table + 
        " WHERE username == \"" + username + "\"";
        var queryString = 
        "INSERT INTO " + table + 
        " (username, passwd) VALUES (\"" + username + "\", \"" + passwd + "\") ";
        this.db.all(testExist, (err, rows) => {
            if (err) throw err;
            if (rows.length > 0) {
                console.log("User \"" + username + "\" already exists");
                return;
            }
            else {
                this.db.run(queryString, (err) => {
                    if (err) throw err;
                    callback(username);            
                }); 
            }
        });        
    }

    closeDatabase() {
        this.db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("-------- Closed the database connection --------");
        });
    }
}

function print(data) {
    console.log(data);
}

userDatabase = new QueryDatabase("./db/db.sqlite", schema);
userDatabase.connectDatabase();
userDatabase.readTableAll("users", print);
userDatabase.readTableByUsernames("users", "allen", print);
userDatabase.addUser("users", "James", "test", print);
userDatabase.closeDatabase();