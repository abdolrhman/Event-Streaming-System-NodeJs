const Queue = require("bull");
const producer = require("./producer");
const helpers = require("../../Helper/onCompleteHelpers");
const AdsImpressionMonthlyModel = require("../../models/AdsImpressionMonthlySchema");
const AdsImpressionModel = require("../../models/AdsImpressionSchema");
const AdsProcessingQueue = new Queue("AdsProcessing", "redis://127.0.0.1:6379");

AdsProcessingQueue.process(require("./consumer"));

// Define a local completed event
AdsProcessingQueue.on("completed", async (job, result) => {
  const eventType = job["data"]["type"]["type"];
  const today = new Date();
  if (eventType === "AdImpression" && helpers.isLastDay(today)) {
    const date = new Date();
    const dateMonth = date.getMonth() + 1;
    const monthlyAdImpressionCount = await AdsImpressionModel.find({
      Month: dateMonth
    }).count();
    console.log("count", monthlyAdImpressionCount);
    AdsImpressionMonthlyModel.create({
      AdsImpressionCount: monthlyAdImpressionCount,
      Month: dateMonth
    });
  }
  console.log("eeee", eventType);

  console.log(`Job completed with result ${result}`);
});

module.exports = async function(type, data) {
  return await producer(AdsProcessingQueue, type, data);
};
