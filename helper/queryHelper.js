/**
 * Update Model by increment field by one
 * Or create a new one with default data
 * @param modelName
 * @param query
 * @param update
 * @returns {Promise<void>}
 */
async function updateRecordOrCreate(modelName, query, update) {
  let options = { upsert: true, new: true, setDefaultsOnInsert: true };
  await modelName.findOneAndUpdate(query, update, options);
}
module.exports.updateRecordOrCreate = updateRecordOrCreate;

module.exports.AdsImpressionCreate = function(schema, AdId, UserId, Month) {
  const AdsImpression = schema;
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
};
