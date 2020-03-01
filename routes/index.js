const express = require("express");
const router = express.Router();
// const kafka = require("./consumer");
const queue = require("../modules/Bull/queue");
// const consumer = require("./consumer");
const AnalysisTopic = require("../models/AnalysisTopic");
/**
 * End point that manages the three events
 */
router.post("/", async function(req, res, next) {
  // access req body
  const eventProperties = req.body;
  const eventType = eventProperties["Type"];
  // use the right producer with the right event based on body type
  const AnalysisDataEvent = new AnalysisTopic(
    eventProperties["Type"],
    eventProperties["Url"],
    eventProperties["Meta"]
  );

  const queueHandler = await queue(eventType, AnalysisDataEvent);

  res.send("endedSuccessfully").status(200);
});

module.exports = router;
