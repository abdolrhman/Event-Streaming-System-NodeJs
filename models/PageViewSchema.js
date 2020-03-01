const mongoose = require("./SchemaIntialization");

const pageViewSchema = new mongoose.Schema({
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

const pageViewModel = mongoose.model("PageView", pageViewSchema);
module.exports = pageViewModel;
