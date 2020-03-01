module.exports.grapeNameFromUrl = eventUrl => {
  return /[^/]*$/.exec(eventUrl);
};

module.exports.dateMonth = () => {
  const date = new Date();
  return date.getMonth() + 1;
};
