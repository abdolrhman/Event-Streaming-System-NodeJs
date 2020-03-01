const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "speakol",
  brokers: [`localhost:9092`]
});

const produceDataToQueue = async function producer(type, data) {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: "analytics-data",
    messages: [{ key: type, value: JSON.stringify(data) }]
  });
};
module.exports.producer = produceDataToQueue;
