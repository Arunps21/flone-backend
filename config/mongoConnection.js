const mongoose = require("mongoose");

mongoose
  .connect(`${process.env.MONGO_URL}/flone`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err.message);
  });

module.exports = mongoose.connection;
