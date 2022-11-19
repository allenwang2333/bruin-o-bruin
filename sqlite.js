/*
    Handles the request of database query
    @author Allen Wang
    @date Nov 8 2022
*/

const sqlite3 = require('sqlite3').verbose();

var schema = {
    "users": ["id", "email", "username", "userid" ,"passwd"],
    "posts": ["id", "title", "author", "authorid" ,"content", "likes", "postid", "image"]
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
        var queryString = `SELECT * FROM ${table}`;
        let data = {};
        this.db.all(queryString, (err, rows) => {
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

    readTableByEmail(table, email, callback) {
        var queryString = `SELECT * FROM ${table} WHERE email == "${email}"`;
        let userInfo = {}; 
        this.db.all(queryString, (err, rows) => {
            if (err) throw err;
            rows.forEach(function (row) {
                userInfo[schema[table][1]] = row[schema[table][1]];
                userInfo[schema[table][2]] = row[schema[table][2]];
                userInfo[schema[table][3]] = row[schema[table][3]];
                userInfo[schema[table][4]] = row[schema[table][4]];
            });
            callback(userInfo);
        });
    }

    addUser(table, email, username, userid, passwd, callback) {
        var testExist = `SELECT * FROM ${table} WHERE email == "${email}"`;
        var queryString = 
        `INSERT INTO ${table} (email, username, userid, passwd) ` + 
        `VALUES ("${email}", "${username}", "${userid}", "${passwd}")`;
        this.db.all(testExist, (err, rows) => {
            let userInfo = {};
            if (err) throw err;
            if (rows.length > 0) {
                console.log(`User ${username} already exists`);
                callback(userInfo);
                return;
            }
            else { 
                this.db.run(queryString, (err) => {
                    userInfo[schema[table][1]] = email;
                    userInfo[schema[table][2]] = username;
                    userInfo[schema[table][3]] = userid;
                    userInfo[schema[table][4]] = passwd;
                    if (err) throw err;
                    callback(userInfo);            
                }); 
            }
        });        
    }

    updatePassword(table, email, username, passwd, callback) {
        var testExist = `SELECT * FROM ${table} WHERE email == "${email}"`;
        var updateString = `UPDAT ${table} SET passed = "${passwd}" WHERE email == "$email"`;
        this.db.all(testExist, (err, rows) => {
            let userInfo = {};
            if (err) throw err;
            if (rows.length > 0 && rows[0].username == username) {
                this.db.run(updateString, (err) => {
                    if (err) throw err;
                    userInfo[schema[table][1]] = email;
                    userInfo[schema[table][2]] = username;
                    userInfo[schema[table][3]] = rows[0].userid;
                    userInfo[schema[table][4]] = passwd;
                    callback(userInfo);
                });  
            }
            else {
                console.log("User does not exist or wrong username");
                callback(userInfo);
                return;
            }
        });
    }

    addNewPost(table, title, author, authorid, content, likes, postid , image, callback) {
        var queryString = `INSERT INTO ${table} (title, author, authorid, content, likes, postid, image) ` + 
        `VALUES ("${title}", "${author}", "${authorid}", "${content}", "${likes}", "${postid}", "${image}")`
        let postInfo = {};
        this.db.run(queryString, (err) => {
            if (err) throw err;
            postInfo[schema[table][1]] = title;
            postInfo[schema[table][2]] = author;
            postInfo[schema[table][3]] = authorid;
            postInfo[schema[table][4]] = content;
            postInfo[schema[table][5]] = likes;
            postInfo[schema[table][6]] = postid;
            postInfo[schema[table][7]] = image;
            callback(postInfo);
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

//userDatabase = new QueryDatabase("./db/db.sqlite", schema);
//userDatabase.connectDatabase();
// userDatabase.readTableAll("users", print);
// userDatabase.updatePassword("users", "adefen@admin", "efihsrgifed", print);
//userDatabase.readTableByEmail("users", "allen@admin", print);
// userDatabase.addUser("users", "james@admin", "james" , "jamestesting", print);
// userDatabase.addUser("users", "sakura@admin", "sakura" , "sakuratesting", print);
// userDatabase.closeDatabase();

// postDatabase = new QueryDatabase("./db/db.sqlite", schema);
// postDatabase.connectDatabase();
// //postDatabase.readTableAll("posts", print);
// postDatabase.addNewPost("posts", "test post 2", "allen", "test content 2", "test imageurl 2", "test image 2", print);
// postDatabase.readTableAll("posts", print);

module.exports.QueryDatabase = QueryDatabase;
module.exports.schema = schema;