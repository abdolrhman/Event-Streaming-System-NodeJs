const Queue = require("bull");
const redis = require("ioredis");
const uuid = require("uuid");

describe("general queue test", function() {
  let queue;
  let client;
  let data = {
    Type: "AdClick",
    Url: "google.com/kill",
    Meta: {
      UserId: "fd123",
      AdId: "34"
    }
  };
  beforeEach(() => {
    client = new redis();
    return client.flushdb();
  });
  afterEach(function() {
    return queue.close().then(() => {
      return client.quit();
    });
  });

  beforeEach(() => {
    queue = new Queue("test-queue", {
      redis: { port: 6379, host: "127.0.0.1" }
    });
  });
  describe("create job into queue", () => {
    it("should add job", async function() {
      const job = await queue.add(data);
      expect(typeof job).toBe("object");
    });

    it("should process job", done => {
      queue.process(() => {
        return Promise.resolve();
      });

      queue.add({ data });

      queue.on("completed", job => {
        if (job) {
          done();
        }
      });
    });
  });

  describe("notification launch", () => {
    it("should send notification on pageView increase more than 10", function(done) {
      done();
    });
    it("should send notification on pageCount increase more than 10", function(done) {
      done();
    });
    it("should send notification on AdClick increase more than 10", function(done) {
      done();
    });
  });

  describe("AdClick launch", () => {
    it("should add click count for valid 3 clicks", function(done) {
      done();
    });
  });

  describe("PageView launch", () => {
    it("should count pageView for each website", function(done) {
      done();
    });
  });
  describe("AdImpression launch", () => {
    it("should count views of all users in month", function(done) {
      done();
    });
  });
});
