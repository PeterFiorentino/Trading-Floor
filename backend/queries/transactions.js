const db = require('../db')

//Contains the query to get every transaction a user makes in order to present on their audit
const getTransactionsByUser = (user_id) => {
    const transactions = db.any(`SELECT * FROM transactions WHERE user_id = $1`, user_id);
    return transactions;
}

//Contains the query to add a new transaction
const postTransaction = (user_id, quantity, ticker, price_paid) => {
    const newTransaction = db.none(`INSERT INTO transactions (user_id, quantity, ticker, price_paid) VALUES ($1, $2, $3, $4)`, [user_id, quantity, ticker, price_paid])
    return newTransaction
}

module.exports = {
    getTransactionsByUser,
    postTransaction
}