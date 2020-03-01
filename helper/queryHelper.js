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
