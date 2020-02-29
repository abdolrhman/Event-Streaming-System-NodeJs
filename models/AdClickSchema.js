const mongoose = require("./SchemaIntialization");

const AdClickSchema = new mongoose.Schema({
  ClickCount: {
    type: Number,
    default: 0
  },
  AdId: {
    type: String
  },
  Website: {
    type: String
  }
});
const AdClick = mongoose.model("AdClick", AdClickSchema);
module.exports.AdClick = AdClick;

const userCountSchema = new mongoose.Schema({
  UserId: {
    type: String,
    default: 0
  },
  AvgClick: {
    type: Number,
    default: 1
  }
});

const userCountModel = mongoose.model("userCount", userCountSchema);
module.exports.userCountModel = userCountModel;
