var express = require('express');
var router = express.Router();
const authHelpers = require('../auth/helpers')
const transactionQueries = require('../queries/transactions')

//Calls the function containing the query to get all the transactions for a user
router.get('/:user_id', authHelpers.loginRequired, async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const transactions = await transactionQueries.getTransactionsByUser(user_id)
    res.json({
      payload: transactions,
      msg: `Retrieved all transactions from this user ${user_id}`,
      err: false
    })
  } catch (err) {
    next(err)
  }
});

//Calls the function containing the query to post a new transaction for the user
router.post('/', authHelpers.loginRequired, async (req, res, next) => {
  try {
    let {user_id, quantity, ticker, price_paid} = req.body
    console.log(user_id, quantity, ticker, price_paid)
    const newTransaction = await transactionQueries.postTransaction(user_id, quantity, ticker, price_paid)
    res.send({
      payload: null,
      msg: 'New transaction posted',
      err: false
    })
  } catch (err) {
    next(err)
  }
})


module.exports = router;