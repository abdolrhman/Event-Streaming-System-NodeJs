module.exports = async function(Queue, type, data) {
  return await Queue.add({ type: data });
};
