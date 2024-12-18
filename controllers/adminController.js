const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const salt = 10;
const { tokenCreation } = require("../utils/generateToken");

const adminRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
    let admin = await adminModel.find();
    if (admin.length > 0) {
      return res
        .status(200)
        .json({ status: 200, msg: "You are not authorized to go furthur" });
    }
    await bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        console.log(err.message);
      } else {
        adminModel.create({
          email,
          password: hash,
        });
        res.status(200).json({ status: 200, msg: "Admin Registered" });
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(400).json({ status: 400, msg: "Invalid credentials" });
    }
    let result = await bcrypt.compare(password, admin.password);
    if (!result) {
      res.status(400).json({ staus: 400, msg: "Invalid credentials" });
    } else {
      const token = tokenCreation(admin._id);
      res.status(200).json({ status: 200, msg: "Login success", token });
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { adminRegister, adminLogin };
