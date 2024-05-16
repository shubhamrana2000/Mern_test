const mongoose = require("mongoose");
async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to Database");
  } catch {
    console.log(err);
  }
}
module.exports = connectToDb;
