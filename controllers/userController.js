const userModel = require("../models/userModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const salt = 10;
const { tokenCreation } = require("../utils/generateToken")

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(200).json({ status: 200, msg: "User already exist" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ status: 400, msg: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ status: 400, msg: "Please enter a strong password" });
    }
    await bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        return console.log(err.message);
      }
      let createdUser = await userModel.create({
        name,
        email,
        password: hash,
      });
      const token = tokenCreation(createdUser._id);
      res.status(201).json({ status: 201, msg: "User registed", token});
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: 500, msg: "Failed to register" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: 400, msg: "User not exists" });
    } 
      let result = await bcrypt.compare(password, user.password);
      if (!result) {
        res.status(400).json({ staus: 400, msg: "Incorrect passowrd" });
      } else {
        const token = tokenCreation(user._id)
        res.status(200).json({ status: 200, msg: "Login success", token });
      }
    
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: 500, msg: "Failed to login" });
  }
};

module.exports = { userRegister, userLogin };
