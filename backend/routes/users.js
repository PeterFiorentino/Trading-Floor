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


module.exports = router;
