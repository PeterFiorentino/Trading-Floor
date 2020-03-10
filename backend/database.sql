-- DROP DATABASE if exists stock_exchange;
-- CREATE DATABASE stock_exchange;

-- \c stock_exchange

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    cash INT
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id),
    quantity INT NOT NULL,
    ticker VARCHAR NOT NULL,
    price_paid INT NOT NULL
);

INSERT INTO users (username, email, password, cash)
    VALUES ('PeteFiorentino', 'PFiorentino54@gmail.com','Spotify123', 5000);

INSERT INTO transactions (user_id, quantity, ticker, price_paid)
    VALUES(1, 3, 'AAPL', 100);

SELECT * FROM transactions WHERE user_id = 1;
