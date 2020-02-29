const AnalysisModel = require("../../models/AnalysisSchema");
const AdsImpressionSchema = require("../../models/AdsImpressionSchema");
const AdClickSchema = require("../../models/AdClickSchema");

module.exports = async function(job, done) {
  const analysisDataProperties = job["data"]["type"];
  const eventType = analysisDataProperties["type"];
  const eventUrl = analysisDataProperties["url"];
  const eventMeta = analysisDataProperties["meta"];

  function createNewRecord(pageName, pageCount) {
    const analysisData = new AnalysisModel();
    analysisData.website = eventUrl;
    analysisData.pageName = pageName;
    analysisData.pageCounts = pageCount;
    analysisData.save(function(err) {
      if (!err) {
        console.log("analysis data for page saved");
      } else {
        console.log("error while saving data, err : " + err);
      }
    });
    return analysisData;
  }

  function AdClick(AdId, UserId, Month) {
    const userCounts = new AdClickSchema.userCountModel();
    userCounts.UserId = AdId;
    userCounts.AvgClick = { $inc: 1 };

    userCounts.save(function(err) {
      if (!err) {
        console.log("userCounts e saved");
      } else {
        console.log("error while saving userCounts data, err : " + err);
      }
    });
    return userCounts;
  }

  function AdsImpression(AdId, UserId, Month) {
    const AdsImpression = new AdsImpressionSchema();
    AdsImpression.AdId = AdId;
    AdsImpression.UserId = UserId;
    AdsImpression.Month = Month;
    AdsImpression.save(function(err) {
      if (!err) {
        console.log("AdsImpression e saved");
      } else {
        console.log("error while saving AdsImpression data, err : " + err);
      }
    });
    return AdsImpression;
  }

  async function updateRecordOrCreate(modelName, query, update) {
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };
    await modelName.findOneAndUpdate(query, update, options);
  }

  switch (eventType) {
    case "PageView":
      console.log("page view");
      // grape the page name after website / ...
      let pageName = /[^/]*$/.exec(eventUrl);
      if (pageName === eventUrl) {
        pageName = "root";
      }
      let pageViewQuery = {
        website: eventUrl,
        pageName: pageName
      };
      let update = { $inc: { pageCounts: 1 } };
      await updateRecordOrCreate(AnalysisModel, pageViewQuery, update);

      break;
    case "AdImpression":
      console.log("Ad impression");
      const date = new Date();
      const dateMonth = date.getMonth() + 1;
      AdsImpression(eventMeta["AdId"], eventMeta["UserId"], dateMonth);
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
      console.log("uuuu", userClicks);
      if (userClicks >= 3) {
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
        await AdClickSchema.userCountModel.update(
          {
            UserId: eventMeta["UserId"]
          },
          { $set: { AvgClick: 1 } }
        );
      }
      await AdClickSchema.AdClick.create({
        AdId: eventMeta["AdId"],
        Website: eventUrl
      });

      console.log("cooo", countUserClicks);

      break;
  }

  done();
};
