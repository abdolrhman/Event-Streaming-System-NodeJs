const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [`localhost:9092`]
});

async function produceData() {
  const producer = kafka.producer();

  await producer.connect();
  await producer.send({
    topic: "ADImpression",
    messages: [{ value: "thank you for your death" }]
  });
}

async function produceData2() {
  const producer = kafka.producer();

  await producer.connect();
  await producer.send({
    topic: "PageView",
    messages: [{ value: "thank you mam" }]
  });
}

produceData2();produceData();