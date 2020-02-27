const { Kafka } = require("kafkajs");
const ip = require("ip");

const host = process.env.HOST_IP || ip.address();

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [`${host}:9092`]
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "test-group" });
const consume = async () => {
  // Consuming
  await consumer.connect();

  await consumer.subscribe({ topic: "PageView", fromBeginning: true });
  await consumer.subscribe({ topic: "ADImpression", fromBeginning: true });
  await consumer.subscribe({ topic: "ADClick", fromBeginning: true });

  await consumer.consume({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("topic", topic);
      console.log("partition", partition);
      console.log("message", message["value"].toString());
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString()
      });
    }
  });
};

module.exports.consume = consume;

consume().catch(console.error);
