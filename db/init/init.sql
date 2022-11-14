/*
    Create initial user information
*/

-- UserInfo --

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    username TEXT NOT NULL,
    passwd TEXT NOT NULL
);

INSERT INTO users 
    (email, username, passwd) 
VALUES 
    ('admin@admin', 'admin', 'admin'),
    ('allen@admin', 'allen', 'allentesting'),
    ('jack@admin', 'jack', 'jacktesting');