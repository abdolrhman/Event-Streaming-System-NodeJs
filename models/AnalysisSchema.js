const mongoose = require("./SchemaIntialization");

const AnalysisSchema = new mongoose.Schema({
  Type: {
    type: String
  },
  Url: {
    type: String
  },
  Meta: {
    type: String
  }
});

const AnalysisModel = mongoose.model("Analysis", AnalysisSchema);

// insert a new user
const heru = new AnalysisModel();
heru.Type = "aaa";
heru.Url = "aaa password";
heru.Meta = "hell";

// save instance
heru.save(function(err) {
  if (!err) {
    console.log("analysis saved");
  } else {
    console.log("error while save analysis, err : " + err);
  }
});
