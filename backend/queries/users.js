const db = require('../db')
const authHelpers = require("../auth/helpers");

const createUser = async (user) => {
  const passwordDigest = await authHelpers.hashPassword(user.password);

  const insertUserQuery = `
      INSERT INTO users (username, email, password, cash) 
        VALUES ($/username/, $/email/, $/password/, 5000.00)
        RETURNING *
    `

  const newUser = await db.one(insertUserQuery, {
    username: user.username,
    email: user.email,
    password: passwordDigest
  })

  delete newUser.password_digest // Do not return the password_digest and accidentally expose it
  return newUser
}

const getUserByEmail = async (email) => {
  const user = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [email])
  return user;
}

const changeCash = async (newCash, user_id) => {
  const newCash = await db.oneOrNone(`UPDATE user SET cash = $1 WHERE id = $2`, [newCash, user_id])
  return newCash;
}

const getAllUsers = async () => {
    const users = await db.any("SELECT * FROM users")
    return users;
  }

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  changeCash
}