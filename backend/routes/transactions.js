var express = require('express');
var router = express.Router();
const authHelpers = require('../auth/helpers')
const transactionQueries = require('../queries/transactions')


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

router.get('/', async (req, res, next) => {
  try {
    const trans = await transactionQueries.getAllTrans()
    res.send({
      payload: trans
    })
  } catch (err) {
    next(err)
  }
})

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