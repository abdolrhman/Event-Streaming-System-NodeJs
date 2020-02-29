const mongoose = require("./SchemaIntialization");

const AdsImpressionMonthlySchema = new mongoose.Schema({
  AdsImpressionCount: {
    type: Number
  },
  Month: {
    type: Number
  }
});

const AdsImpressionMonthlyModel = mongoose.model(
  "AdImpressionMonthly",
  AdsImpressionMonthlySchema
);
module.exports = AdsImpressionMonthlyModel;
