const mongoose = require("./SchemaIntialization");

const AdsImpressionSchema = new mongoose.Schema({
  AdId: {
    type: String,
    required: true
  },
  UserId: {
    type: String
  },
  Month: {
    type: Number
  }
});

const AdsImpression = mongoose.model("AdImpression", AdsImpressionSchema);
module.exports = AdsImpression;
