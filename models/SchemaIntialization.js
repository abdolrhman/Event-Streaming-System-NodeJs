const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("useCreateIndex", true);

mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(r => {});
const db = mongoose.connection;
mongoose.set("useFindAndModify", false);
module.exports = mongoose;
db.on("error", error => console.error(error));
db.once("open", () => console.log("connected to database"));
