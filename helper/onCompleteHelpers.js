const AnalysisModel = require("../models/PageViewSchema");
const AdsImpressionSchema = require("../models/AdsImpressionSchema");
const AdClickSchema = require("../models/AdClickSchema");
const config = require("../config/default");
const generalHelper = require("../helper/generalHelper");

module.exports.isLastDay = function isLastDay(dt) {
  console.log(new Date(dt.getTime() + 86400000).getDate() === 1);
  return new Date(dt.getTime() + 86400000).getDate() === 1;
};

module.exports.spikeNotification = async (eventType, eventData) => {
  switch (eventType) {
    case "PageView":
      let pageName = generalHelper.grapeNameFromUrl(eventData["url"]);
      const PageView = await AnalysisModel.findOne({
        pageName: pageName
      });
      if (PageView["pageCounts"] >= config.spikeConfig.pageView) {
        console.log(
          `There are a lot of hits on page ${pageName} around ${PageView["pageCounts"]}`
        );
      }
      break;
    case "AdClick":
      const AdClickWebsite = await AdClickSchema.AdClick.findOne({
        Website: eventData["url"]
      });
      if (AdClickWebsite["ClickCount"] >= config.spikeConfig.AdClick) {
        console.log(
          `There are a lot of hits on website ${AdClickWebsite["Website"]} around ${AdClickWebsite["ClickCount"]}`
        );
      }
      break;
  }
};
