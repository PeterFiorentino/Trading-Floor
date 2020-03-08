var express = require('express');
var router = express.Router();
const authHelpers = require('../auth/helpers')
const usersQueries = require('../queries/users')


router.get('/:user_id', authHelpers.loginRequired, async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const transactions = await usersQueries.getAllUsers()
    res.send({
      payload: users,
      msg: "Retrieved all users",
      err: false
    })
  } catch (err) {
    next(err)
  }
});


module.exports = router;