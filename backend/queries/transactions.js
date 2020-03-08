const db = require('../db')

//Get every transaction a user makes in order to present on their audit
const getTransactionByUser = (user_id) => {
    const transactions = db.any(`SELECT * FROM transactions WHERE user_id = $1`, user_id);
    return transactions;
}

module.exports = {
    getTransactionByUser
}