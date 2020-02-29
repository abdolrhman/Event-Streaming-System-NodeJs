module.exports.isLastDay = function isLastDay(dt) {
  console.log(new Date(dt.getTime() + 86400000).getDate() === 1);
  return new Date(dt.getTime() + 86400000).getDate() === 1;
};
