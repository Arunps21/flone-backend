const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  },
  { timestamps: true },
  { minimize: false }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
