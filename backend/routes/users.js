var express = require('express');
var router = express.Router();
const authHelpers = require('../auth/helpers')
const usersQueries = require('../queries/users')


//Calls the function that contains the query to get all users
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

//Calls the function that contains the query to get a user by their email
router.get('/:email', authHelpers.loginRequired, async (req, res, next) => {
  try {
    const user = await usersQueries.getUserByEmail(req.body.email)
    res.send({
      payload: user,
      msg: "Retrieved user by email",
      err: false
    })
  } catch (error) {
    next(error)
  }
}) 


//Calls the function that contains the query to change the amount of cash a user has
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
