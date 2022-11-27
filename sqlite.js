/*
    Handles the request of database query
    @author Allen Wang
    @date Nov 8 2022
*/

const sqlite3 = require('sqlite3').verbose();

var schema = {
    "users": ["id", "email", "username", "userid" ,"passwd"],
    "posts": ["id", "title", "author", "authorid" ,"content", "likes", "postid", "image", "time"],
    "scoreboard": ["id", "username", "userid", "score", "time"]
};

class QueryDatabase {
    constructor(filePath, schema) {
        this.filePath = filePath;
        this.schema = schema;
    }  

    connectDatabase(callback) {
        this.db = new sqlite3.Database(this.filePath, (err) => {
            if (err) {
                return console.error(err.message);
            }
            //console.log("-------- Connected to " + this.filePath + " database --------");
        });
        callback();
    }

    readTableAll(table, callback) {
        var queryString = `SELECT * FROM ${table}`;
        let data = {};
        this.db.all(queryString, (err, rows) => {
            if (err) throw err;
            data = [];
            rows.forEach((row) => {
                let rowInfo = {};
                for (var i = 0; i < schema[table].length; i++) {
                    rowInfo[schema[table][i]] = row[schema[table][i]];
                }
                data.push(rowInfo);
            });
            callback(data);
        });
    }

    readTableByEmail(table, email, callback) {
        var queryString = `SELECT * FROM ${table} WHERE email == "${email}"`;
        let userInfo = {}; 
        this.db.all(queryString, (err, rows) => {
            if (err) throw err;
            rows.forEach((row) => {
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
        var updateString = `UPDATE ${table} SET passwd = "${passwd}" WHERE email == "${email}"`;
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
            }
        });
    }

    addNewPost(table, title, author, authorid, content, likes, postid , image, time, callback) {
        var queryString = `INSERT INTO ${table} (title, author, authorid, content, likes, postid, image, time) ` + 
        `VALUES ("${title}", "${author}", "${authorid}", "${content}", "${likes}", "${postid}", "${image}", "${time}")`
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
            postInfo[schema[table][8]] = time;
            callback(postInfo);
        });
    }

    likeOrUnlikePost(table, postid, count, callback) {
        var queryString = `SELECT * FROM ${table} WHERE postid == "${postid}"`;
        this.db.all(queryString, (err, rows) => {
            if (err) throw err;
            if (rows.length > 0) {
                var likeInfo = {};
                if (!(rows[0].likes == 0 && count == -1)) {
                    let newCount = rows[0].likes + count;
                    console.log(newCount); // here the newCount is correct
                    let updateString = `UPDATE ${table} SET likes = ${newCount} WHERE postid == "${postid}"`;
                    this.db.run(updateString, (err) => {
                        if (err) throw err;
                        likeInfo['postid'] = postid;
                        likeInfo['newCount'] = newCount;
                        callback(likeInfo);
                    });
                }
                else {
                    callback(likeInfo);
                    console.log('Cannot unlike post when there are no likes');
                }
            }
        });
    }

    addUserOrUpdateScoreboard(table, username, userid, score, time, callback) {
        var table = 'scoreboard';
        var queryString = `SELECT * FROM ${table} where userid == "${userid}"`;
        var insertString = `INSERT INTO ${table} (username, userid, score, time) VALUES ("${username}", "${userid}", "${score}", "${time}")`;
        var updateString = `UPDATE ${table} SET score = "${score}", time = "${time}" WHERE userid == "${userid}"`;
        this.db.all(queryString, (err, rows) => {
            if (err) throw err;
            var scoreInfo = {};
            if (rows.length == 0) {
                this.db.run(insertString, (err) => {
                    if (err) throw err;
                    scoreInfo[schema[table][1]] = username;
                    scoreInfo[schema[table][2]] = userid;
                    scoreInfo[schema[table][3]] = score;
                    scoreInfo[schema[table][4]] = time;
                    callback(scoreInfo);
                });
            }
            else if (Number(rows[0].score) < score) {
                this.db.run(updateString, (err)=> {
                    if (err) throw err;
                    scoreInfo[schema[table][1]] = username;
                    scoreInfo[schema[table][2]] = userid;
                    scoreInfo[schema[table][3]] = score;
                    scoreInfo[schema[table][4]] = time;
                    callback(scoreInfo);
                });
            }
            else {
                callback(scoreInfo);
            }
        });
    }

    closeDatabase() {
        this.db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            //console.log("-------- Closed the database connection --------");
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
//postDatabase.readTableAll("posts", print);
// postDatabase.addNewPost("posts", "test post 2", "allen", "test content 2", "test imageurl 2", "test image 2", print);
// postDatabase.readTableAll("posts", print);

// scoreboardDatabase = new QueryDatabase("./db/db.sqlite", schema);
// scoreboardDatabase.connectDatabase();
// scoreboardDatabase.addUserOrUpdateScoreboard("scoreboard", "allen", "1234", "120", "2020", print);
// scoreboardDatabase.readTableAll("scoreboard", print);
// scoreboardDatabase.closeDatabase();
module.exports.QueryDatabase = QueryDatabase;
module.exports.schema = schema;