const { Kafka } = require("kafkajs");
const ip = require("ip");
const AnalysisModel = require("../../models/PageViewSchema");

const host = process.env.HOST_IP || ip.address();

const kafka = new Kafka({
  clientId: "speakol",
  brokers: [`${host}:9092`]
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "test-group" });

const run = async () => {
  // Consuming
  await consumer.connect();

  await consumer.subscribe({ topic: "analytics-data" });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // this will be what inside the consumer in kafka
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString()
      });
    }
  });
};

module.exports.run = run;

run().catch(console.error);
