DROP DATABASE if exists stock_exchange;
CREATE DATABASE stock_exchange;

\c stock_exchange

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL
);

INSERT INTO users (username, password)
    VALUES ('PeteFiorentino', 'Spotify123');

SELECT * FROM users;