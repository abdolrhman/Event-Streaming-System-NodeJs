const Queue = require("bull");
const producer = require("./producer");
const helpers = require("../../helper/onCompleteHelpers");
const AdsImpressionMonthlyModel = require("../../models/AdsImpressionMonthlySchema");
const AdsImpressionModel = require("../../models/AdsImpressionSchema");
const AdsProcessingQueue = new Queue("AdsProcessing", "redis://127.0.0.1:6379");

AdsProcessingQueue.process(require("./consumer"));

// Define a local completed event
AdsProcessingQueue.on("completed", async (job, result) => {
  /**
   * Create a record each last day in month with  the number of AdImpression
   * For that month
   */
  const eventDataType = job["data"]["type"];
  const eventType = eventDataType["type"];
  const today = new Date();
  if (eventType === "AdImpression" && helpers.isLastDay(today)) {
    const date = new Date();
    const dateMonth = date.getMonth() + 1;
    const monthlyAdImpressionCount = await AdsImpressionModel.find({
      Month: dateMonth
    }).count();
    AdsImpressionMonthlyModel.create({
      AdsImpressionCount: monthlyAdImpressionCount,
      Month: dateMonth
    });
  }

  // spike thing !!
  await helpers.spikeNotification(eventType, eventDataType);
});

module.exports = async function(type, data) {
  return await producer(AdsProcessingQueue, type, data);
};
