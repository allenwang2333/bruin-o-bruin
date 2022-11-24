/*
    Create initial user information
*/

-- UserInfo --

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    username TEXT NOT NULL,
    userid TEXT NOT NULL,
    passwd TEXT NOT NULL
);