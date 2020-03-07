const db = require('../db')
const authHelpers = require("../auth/helpers");

const createUser = async (user) => {
  const passwordDigest = await authHelpers.hashPassword(user.password);

  const insertUserQuery = `
      INSERT INTO users (username, password) 
        VALUES ($/username/, $/password/)
        RETURNING *
    `

  const newUser = await db.one(insertUserQuery, {
    username: user.username,
    password: passwordDigest
  })

  delete newUser.password_digest // Do not return the password_digest and accidentally expose it
  return newUser
}

const getUserByUsername = async (username) => {
  const user = await db.oneOrNone("SELECT * FROM users WHERE username = $1", [username])
  return user;
}


const getAllUsers = async () => {
    const users = await db.any("SELECT * FROM users")
    return users;
  }

module.exports = {
  createUser,
  getUserByUsername,
  getAllUsers
}