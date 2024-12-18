const express = require("express")
const adminRoutes = express.Router()
const { adminRegister, adminLogin } = require("../controllers/adminController")

adminRoutes.route("/register").post(adminRegister)
adminRoutes.route("/login").post(adminLogin)

module.exports = adminRoutes