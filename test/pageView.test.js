const Queue = require("bull");
const redis = require("ioredis");
const uuid = require("uuid");

describe("general queue test", function() {
  let queue;
  let client;

  beforeEach(() => {
    client = new redis();
    return client.flushdb();
  });
  afterEach(function() {
    this.timeout(
      queue.settings.stalledInterval * (1 + queue.settings.maxStalledCount)
    );
    return queue.close().then(() => {
      return client.quit();
    });
  });

  beforeEach(() => {
    queue = new Queue("test-" + uuid(), {
      redis: { port: 6379, host: "127.0.0.1" }
    });
  });
  describe("create", () => {
    let job;
    let data;
    let opts;

    beforeEach(() => {
      data = { foo: "bar" };
      opts = { testOpt: "enabled" };

      return Job.create(queue, data, opts).then(createdJob => {
        job = createdJob;
      });
    });

    const output = [{ id: 3, url: "https://www.link3.dev" }];
    expect(filterByTerm(input, "link")).toEqual(output);
  });
});
