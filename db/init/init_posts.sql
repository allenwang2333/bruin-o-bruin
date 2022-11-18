CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    content TEXT NOT NULL,
    imageurl TEXT NOT NULL,
    image BLOB NOT NULL,
    timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO posts
(title , author , content , imageurl , image)
VALUES
('test postt', 'Allen', 'This is content', 'www.google.com', 'image');