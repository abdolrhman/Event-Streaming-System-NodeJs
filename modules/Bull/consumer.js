const AnalysisModel = require("../../models/PageViewSchema");
const AdsImpressionSchema = require("../../models/AdsImpressionSchema");
const AdClickSchema = require("../../models/AdClickSchema");
const generalHelpers = require("../../helper/generalHelper");
const { updateRecordOrCreate, AdsImpressionCreate } = require("../../helper/queryHelper");

module.exports = async function(job, done) {
  const analysisDataProperties = job["data"]["type"];
  const eventType = analysisDataProperties["type"];
  const eventUrl = analysisDataProperties["url"];
  const eventMeta = analysisDataProperties["meta"];

  switch (eventType) {
    case "PageView":
      console.log("page view");
      // grape the page name after website / ...
      let pageName = generalHelpers.grapeNameFromUrl(eventUrl);
      if (pageName === eventUrl) {
        pageName = "root";
      }
      let pageViewQuery = {
        website: eventUrl,
        pageName: pageName
      };
      let update = { $inc: { pageCounts: 1 } };
      // website page and increase page count by one in update
      await updateRecordOrCreate(AnalysisModel, pageViewQuery, update);

      break;
    case "AdImpression":
      console.log("Ad impression");
      const AdsImpression = new AdsImpressionSchema();
      AdsImpressionCreate(
        AdsImpression,
        eventMeta["AdId"],
        eventMeta["UserId"],
        generalHelpers.dateMonth()
      );
      break;
    case "AdClick":
      console.log("Ad Click");
      let userCounterQuery = {
        UserId: eventMeta["UserId"]
      };
      const updateUserCounterModel = { $inc: { AvgClick: 1 } };

      await updateRecordOrCreate(
        AdClickSchema.userCountModel,
        userCounterQuery,
        updateUserCounterModel
      );
      const countUserClicks = await AdClickSchema.userCountModel.find({
        UserId: eventMeta["UserId"]
      });
      const userClicks = countUserClicks[0]["AvgClick"];
      if (userClicks > 3) {
        // increase number ofAdClick schema "ClickCounts" by one
        let AdClickQuery = {
          AdId: eventMeta["AdId"],
          Website: eventUrl
        };
        const updateAdClickModel = { $inc: { ClickCount: 1 } };

        await updateRecordOrCreate(
          AdClickSchema.AdClick,
          AdClickQuery,
          updateAdClickModel
        );

        // reset count clicks to 0
        await AdClickSchema.userCountModel.updateOne(
          {
            UserId: eventMeta["UserId"]
          },
          { $set: { AvgClick: 1 } }
        );
      }

      break;
  }

  done();
};
