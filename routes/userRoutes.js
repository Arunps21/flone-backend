const express = require("express")
const userRoutes = express.Router()
const { userRegister, userLogin } = require("../controllers/userController")

userRoutes.route("/register").post(userRegister)
userRoutes.route("/login").post(userLogin)

module.exports = userRoutes