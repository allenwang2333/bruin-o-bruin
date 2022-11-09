/*
    Create initial user information
*/

-- UserInfo --

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    passwd TEXT NOT NULL
);

INSERT INTO users 
    (username, passwd) 
VALUES 
    ('admin', 'admin'),
    ('allen', '1234testing');