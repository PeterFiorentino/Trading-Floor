var express = require('express');
var router = express.Router();
const authHelpers = require('../auth/helpers')
const usersQueries = require('../queries/users')


router.get('/', authHelpers.loginRequired, async (req, res, next) => {
  try {
    const users = await usersQueries.getAllUsers()
    res.send({
      payload: users,
      msg: "Retrieved all users",
      err: false
    })
  } catch (err) {
    next(err)
  }
});

router.patch('/', authHelpers.loginRequired, async (req, res, next) => {
  try {
    let { newCash, user_id} = req.body;
    const changeCash = await usersQueries.changeCash(newCash, user_id)
    res.send({
      payload: changeCash,
      msg: `Changed the amount of money user ${user_id} has available.`,
      err: false
    })
  } catch (err) {
    next(err)
  }
})


module.exports = router;
