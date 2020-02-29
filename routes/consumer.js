const { Kafka } = require("kafkajs");
const ip = require("ip");
const AnalysisModel = require("../models/AnalysisSchema");

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
  // await consumer.subscribe({ topic: "ADImpression", fromBeginning: true });
  // await consumer.subscribe({ topic: "ADClick", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      message = JSON.parse(message["value"]);
      // insert a new user
      console.log('mess', message);
      const analysisData = new AnalysisModel();
      analysisData.Type = '222';
      analysisData.Url = 'ggg';
      analysisData.Meta = 'qweq';

      // save instance
      analysisData.save(function(err) {
        if (!err) {
          console.log("analysis saved");
        } else {
          console.log("error while save analysis, err : " + err);
        }
      });

      console.log("topic", topic);
      console.log("partition", partition);
      console.log("message", JSON.parse(message["value"]));
      console.log({
        partition,
        offset: message.offset,
        value: message.value
      });
    }
  });
};

module.exports.run = run;

run().catch(console.error);
