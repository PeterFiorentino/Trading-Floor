DROP DATABASE if exists stock_exchange;
CREATE DATABASE stock_exchange;

\c stock_exchange

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    cash INT
);

INSERT INTO users (username, email, password, cash)
    VALUES ('PeteFiorentino', 'PFiorentino54@gmail.com','Spotify123', 5000);

SELECT * FROM users WHERE email = 'PFiorentino54@gmail.com';