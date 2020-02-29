const mongoose = require("./SchemaIntialization");

const AnalysisSchema = new mongoose.Schema({
  website: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  pageName: {
    type: String
  },
  pageCounts: {
    type: Number,
    default: 1
  }
});

const AnalysisModel = mongoose.model("Analysis", AnalysisSchema);
module.exports = AnalysisModel;
